import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MovieContainer from "./MovieContainer";
import Fuse from "fuse.js";

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],        // for store the movies when we fetch from the server
      matches: [],      // when we search movie, so result of all movies store in here
      search: "",       // for search keyword
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
        // Authorization: "Token 412dd490c43ad5534dd2e1e38a92f9c32d59d62c", 
      },
    })
      .then((resp) => resp.json())
      .then((res) =>
        this.setState({ movies: res }, function () {

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
            this.setState({ movies: this.state.matches });
          }
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <Container className="pl-3">
          {/* pass one by one movie for displaying on to the main page */}
          {this.state.movies.map((movie) => (
            <MovieContainer key={movie.id} movie={movie} />
          ))}
        </Container>
      </div>
    );
  }
}

export default MovieList;
