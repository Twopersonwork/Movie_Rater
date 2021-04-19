import React, { Component } from "react";
import { Card } from "react-bootstrap";

export class MovieDetail extends Component {
  render() {
    const movie = this.props.movie;

    return (
      <div>
        <Card style={{ width: "10rem" }}>
          <Card.Img
            // onClick={() => this.movieDetail(movie.id)}
            variant="top"
            src={movie.Poster}
          />

          <Card.Body style={{ width: "20rem" }}>
            <Card.Title>{movie.title}</Card.Title>

            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default MovieDetail;
