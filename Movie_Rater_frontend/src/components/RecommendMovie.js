import React, { Component } from "react";
import MovieContainer from "./MovieContainer";

class RecommendMovie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      currentMovies: [],
      matches: [],
      result: [],
      randMovies: [],
    };
  }

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) =>
        this.setState({ movies: resp }, function () {
          var array = this.props.genre.split(",");

          this.setState(
            {
              currentMovies: this.state.movies.filter(
                (x) =>
                  x.Genre.includes(array[0]) ||
                  x.Genre.includes(array[1]) ||
                  x.Genre.includes(array[2])
              ),
            },
            function () {
              for (var i = 0; i < 10; i++) {
                this.state.randMovies.push(
                  this.state.currentMovies[
                    Math.floor(Math.random() * this.state.currentMovies.length)
                  ]
                );
              }
              const movs = [...new Set(this.state.randMovies)];

              this.setState({ currentMovies: movs });
            }
          );
        })
      );
  }
  render() {
    return (
      <div>
        <h4 className="mt-3">You may also like!</h4>

        {this.state.currentMovies.map((movie) => (
          <MovieContainer key={movie.id} movie={movie} />
        ))}
      </div>
    );
  }
}

export default RecommendMovie;
