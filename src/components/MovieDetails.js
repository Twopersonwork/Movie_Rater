import React, { Component } from "react";
import {
  Card,
  CardImg,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { withCookies } from "react-cookie";

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetail: {},
      token: this.props.cookies.get("auth-token"),
      colored: -1,
    };
  }

  onSubmit = (stars) => (e) => {
    // if (!this.state.stars) {
    //   alert("You must enter stars");
    //   return;
    // }
    if (this.state.token) {
      console.log(stars);

      fetch(
        `http://127.0.0.1:8000/api/movies/${this.props.match.params.id}/rateMovie/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${this.state.token}`,
          },

          body: JSON.stringify({
            stars: stars + 1,
          }),
        }
      )
        .then((resp) => resp.json())
        .then(console.log("stars", this.state.stars))
        .catch((error) => console.log(error));
    }

    // e.preventDefault();
    // this.setState({
    //   stars: "",
    // });
    // console.log("stars", this.state.stars);
    // console.log("token", this.state.token);
  };
  componentDidMount() {
    fetch(`http://127.0.0.1:8000/api/movies/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Token ${this.state.token}`,
      },
    })
      .then((resp) => resp.json())
      .then((res) => this.setState({ movieDetail: res }))
      .catch((error) => console.log(error));
  }

  onhighlight = (high) => () => {
    if (high !== -1) {
      this.setState({
        stars: high,
      });
    } else {
      this.setState({
        stars: 0,
      });
    }
    this.setState({
      colored: high,
    });
  };

  render() {
    console.log(this.state.stars);
    const movie = this.state.movieDetail;
    return (
      <Container className="mt-2">
        <Card>
          <Card.Body>
            <Row>
              <Col sm={8} xl lg md>
                <Card.Img variant="top" src={movie.Poster} />
              </Col>
              <Col sm={4} xl lg md>
                <Card.Text>
                  Title:
                  <span className="mb-2 text-muted forText">{movie.Title}</span>
                </Card.Text>
                <Card.Text>
                  Actors:
                  <span className="mb-2 text-muted forText">
                    {movie.Actors}
                  </span>
                </Card.Text>
                <Card.Text>
                  Awards:
                  <span className="mb-2 text-muted forText">
                    {movie.Awards}
                  </span>
                </Card.Text>
                <Card.Text>
                  Box_office:
                  <span className="mb-2 text-muted forText">
                    {movie.Box_office}
                  </span>
                </Card.Text>
                <Card.Text>
                  Country:
                  <span className="mb-2 text-muted forText">
                    {movie.Country}
                  </span>
                </Card.Text>
                <Card.Text>
                  Director:
                  <span className="mb-2 text-muted forText">
                    {movie.Director}
                  </span>
                </Card.Text>
                <Card.Text>
                  Genre:
                  <span className="mb-2 text-muted forText">{movie.Genre}</span>
                </Card.Text>
                <Card.Text>
                  Language:
                  <span className="mb-2 text-muted forText">
                    {movie.Language}
                  </span>
                </Card.Text>
                <Card.Text>
                  Released:
                  <span className="mb-2 text-muted forText">
                    {movie.Released}
                  </span>
                </Card.Text>
                <Card.Text>
                  Runtime:
                  <span className="mb-2 text-muted forText">
                    {movie.Runtime}
                  </span>
                </Card.Text>
                <Card.Text>
                  Type:
                  <span className="mb-2 text-muted forText">{movie.Type}</span>
                </Card.Text>
                <Card.Text>
                  Writer:
                  <span className="mb-2 text-muted forText">
                    {movie.Writer}
                  </span>
                </Card.Text>
                <Card.Text>
                  imdbVotes:
                  <span className="text-muted forText">{movie.imdbVotes}</span>
                </Card.Text>
                <Card.Text>
                  Ratings:
                  <span className="text-muted forText">
                    {movie.no_of_ratings}
                  </span>
                </Card.Text>
                <Card.Text>
                  Avg Ratings:
                  <span className="text-muted forText">
                    {movie.avg_ratings}
                  </span>
                </Card.Text>
                <Card.Text>
                  Rate this:
                  <span className="mb-2 text-muted forText">
                    {[...Array(5)].map((e, i) => {
                      return (
                        <FaStar
                          size={28}
                          key={i}
                          style={
                            this.state.colored > i - 1
                              ? { color: "orange" }
                              : { color: "" }
                          }
                          onMouseOver={this.onhighlight(i)}
                          onMouseLeave={this.onhighlight(-1)}
                          onClick={this.onSubmit(i)}
                        />
                      );
                    })}
                  </span>
                </Card.Text>
                <Card.Link href={`https://www.imdb.com/title/${movie.imdbID}/`}>
                  More details
                </Card.Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default withCookies(MovieDetails);
