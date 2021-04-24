import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MovieContainer from "./MovieContainer";
import Fuse from "fuse.js";
import { Pagination } from "@material-ui/lab";

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [], // for store the movies when we fetch from the server
      matches: [], // when we search movie, so result of all movies store in here
      search: "", // for search keyword
      offset: 0,
      currentMovies: [],
      perpage: 20,
      currentPage: 0,
      pageCount: null,
    };
  }

  // we fetch all the movies from the server and store it on the movies
  componentDidMount() {
    if (this.props.searchkeyword.length > 0) {
      this.setState({ search: this.props.searchkeyword });
    }
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((res) => {
        var slice = res.slice(
          this.state.offset,
          this.state.offset + this.state.perpage
        );

        this.setState(
          {
            movies: res,
            currentMovies: slice,
            pageCount: Math.ceil(res.length / this.state.perpage),
          },
          function () {
            // This function give us better search functionality
            const fuse = new Fuse(this.state.movies, {
              keys: ["Title"],
            });
            const result = fuse.search(this.state.search);

            if (!result.length) {
              this.setState([]);
            } else {
              result.forEach(({ item }) => {
                this.state.matches.push(item);
              });
              this.setState({ currentMovies: this.state.matches });
            }
          }
        );
      })
      .catch((error) => console.log(error));
  }

  handlePageClick = (e, v) => {
    const offset = (v - 1) * this.state.perpage;

    this.setState(
      {
        currentPage: v,
        offset: offset,
      },
      () => {
        this.loadmoredata();
      }
    );
  };

  loadmoredata() {
    const data = this.state.movies;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perpage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perpage),
      currentMovies: slice,
    });
  }

  render() {
    return (
      <div>
        <Container className="pl-3">
          {/* pass one by one movie for displaying on to the main page */}
          {this.state.currentMovies.map((movie) => (
            <MovieContainer key={movie.id} movie={movie} />
          ))}
          <Pagination
            color="primary"
            style={{ marginTop: "10%", marginBottom: "10%" }}
            count={this.state.pageCount}
            onChange={this.handlePageClick}
            page={this.state.currentPage}
            showFirstButton={true}
            showLastButton={true}
          />
          {/* <ReactPaginate
            initialPage={1}
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            activeClassName={"pagination__link--active"}
          /> */}
        </Container>
      </div>
    );
  }
}

export default MovieList;
