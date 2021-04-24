import React, { Component } from "react";
import { Card} from "react-bootstrap";
import { Link } from "react-router-dom";

class MovieContainer extends Component {
  render() {
    const movie = this.props.movie;
    return (

      // This is for how to display each movie on Movies page
      <div key={movie.id} className="breakpoint">
        <Card className="m-2">
          <Link to={`/movies/${movie.id}`}>
            <Card.Img referrerPolicy="no-referrer" variant="top" src={movie.Poster} style={{maxWidth:"250px",maxHeight:"350px",}}/>
          </Link>
        </Card>
      </div>
    );
  }
}

export default MovieContainer;
