import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import MovieContainer from "./MovieContainer";

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 6622e38254ac5510944a93a53ae3e5d9f6bf5c17",
      },
    })
      .then((resp) => resp.json())
      .then((res) => this.setState({ movies: res }))
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>Hii</h1>
        <h1>Hello</h1>
        <h1>World</h1>
        <Container className="pl-3">
          {this.state.movies.map((movie) => (
            <MovieContainer movie={movie} />
          ))}
        </Container>
      </div>
    );
  }
}

export default MovieList;
