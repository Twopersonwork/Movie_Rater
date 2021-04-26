import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class MovieContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie_id: this.props.movie.id,
    };
  }
  onClick = () => {
    this.setState(
      { movie_id: this.props.movie.id },
      (window.location.href = `/movies/${this.state.movie_id}`)
    );
    // window.location.reload(false);
  };

  render() {
    const movie = this.props.movie;

    return (
      // This is for how to display each movie on Movies page
      <div key={movie.id} className="breakpoint">
        <Card className="m-2">
          <Link to={`/movies/${this.state.movie_id}`}>
            <Card.Img
              referrerPolicy="no-referrer"
              variant="top"
              src={movie.Poster}
              style={{
                // mainWidth: "300px",

                maxWidth: "300px",
                maxHeight: "400px",
              }}
              onClick={this.onClick}
            />
          </Link>
        </Card>
      </div>
    );
  }
}

export default MovieContainer;
