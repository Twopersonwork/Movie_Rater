import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MovieContainer from "./MovieContainer";
import Fuse from "fuse.js";
import { withCookies } from "react-cookie";
import { Link, Redirect } from "react-router-dom";

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      matches: [],
      search: "",
    };
  }

  componentWillMount() {
    console.log(this.props.searchkeyword);
    if (this.props.searchkeyword.length > 0) {
      this.setState({ search: this.props.searchkeyword });
    }

    console.log("token before", this.props.token);
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${this.props.token}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => this.setState({ movies: resp }))
      .catch((error) => console.log(error));
  }

  render() {
    console.log("token", this.props.token);
    console.log("movies", this.state.movies);

    return (
      <div>
        <h1>Movies</h1>

        <Container className="pl-3">
          {this.state.movies.map((movie) => (
            <MovieContainer key={movie.id} movie={movie} />
          ))}
        </Container>
      </div>
    );
  }
}

export default withCookies(MovieList);
