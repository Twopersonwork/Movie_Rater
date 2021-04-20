import React, { Component } from "react";
import { Container } from "react-bootstrap";
import MovieContainer from "./MovieContainer";
import Fuse from "fuse.js";

class MovieList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      matches: [],
      search: "",
    };
  }

  componentDidMount() {
    console.log(this.props.searchkeyword);
    if (this.props.searchkeyword.length > 0) {
      this.setState({ search: this.props.searchkeyword });
    }
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 412dd490c43ad5534dd2e1e38a92f9c32d59d62c",
      },
    })
      .then((resp) => resp.json())
      .then((res) =>
        this.setState({ movies: res }, function () {
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
        <h1>Hello Django Heroku</h1>
        <h1>Prachi</h1>
        <h1>Hello Django Rest</h1>
        <h2>Hello react</h2>
        <Container className="pl-3">
          {this.state.movies.map((movie) => (
            <MovieContainer key={movie.id} movie={movie} />
          ))}
        </Container>
      </div>
    );
  }
}

export default MovieList;
