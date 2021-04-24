import React, { Component } from "react";
import { Container,Grid } from "@material-ui/core";
import MovieContainer from "./MovieContainer";
import Fuse from "fuse.js";
import { Pagination } from "@material-ui/lab";
import Filter from "./Filter";

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [], // for store the movies when we fetch from the server
      matches: [], // when we search movie, so result of all movies store in here
      search: "", // for search keyword
      offset: 0,
      currentMovies: [], // store movies per page
      perpage: 20, // perpage movies
      currentPage: 0, // currentPage
      pageCount: null, //total page count for all movies
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
        // Here we slicing the all the movies for particular page.
        var slice = res.slice(
          this.state.offset,
          this.state.offset + this.state.perpage
        );

        this.setState(
          {
            movies: res,
            currentMovies: slice, //current movies for particular page
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
              this.setState({
                currentMovies: this.state.matches, //after search current movies
                movies: this.state.matches, //movies after search
                pageCount: Math.ceil(
                  this.state.matches.length / this.state.perpage
                ), // page count after search
              });
            }
          }
        );
      })
      .catch((error) => console.log(error));
  }

  /*when user click on any particular page this method calls and for particular page load all the movies
  by calling loadmoredata function*/

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

  //Here we are doing same as we did in componentDidMount for pagination.
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
        <Container className="pl-5 dismovie">
          {/* pass one by one movie for displaying on to the main page */}
          <Grid container>
            <Grid item>
              {/* <Filter /> */}
            </Grid>
            <Grid item>
              {this.state.currentMovies.map((movie) => (
                <MovieContainer key={movie.id} movie={movie} />
              ))}
              {/* We use Pagination from the material ui */}
              <Pagination
                currentPage={this.state.currentPage}
                color="primary"
                style={{ marginTop: "10%", marginBottom: "10%" }}
                count={this.state.pageCount}
                onChange={this.handlePageClick}
                showFirstButton={true}
                showLastButton={true}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default MovieList;
