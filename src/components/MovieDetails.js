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

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetail: {},
      stars: "",
    };
  }

  onSubmit = (e) => {
    if (!this.state.stars) {
      alert("You must enter stars");
      return;
    }
    fetch(
      `http://127.0.0.1:8000/api/movies/${this.props.match.params.id}/rateMovie/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token 39ab2d4b6d017fad9681e241557a4a1573542915",
        },

        body: JSON.stringify({
          stars: this.state.stars,
          movie: this.props.match.params.id,
          user: 0,
        }),
      }
    )
      .then((resp) => resp.json())
      .catch((error) => console.log(error));
    e.preventDefault();
    this.setState({
      stars: "",
    });
    console.log("stars", this.state.stars);
  };
  componentDidMount() {
    fetch(`http://127.0.0.1:8000/api/movies/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token 6622e38254ac5510944a93a53ae3e5d9f6bf5c17",
      },
    })
      .then((resp) => resp.json())
      .then((res) => this.setState({ movieDetail: res }))
      .catch((error) => console.log(error));
  }
  handlerStarsChange = (event) => {
    this.setState({ stars: event.target.value });
    console.log(this.state.stars);
  };

  render() {
    // console.log(this.props.match.params.id);
    // console.log(this.state.movieDetail);
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
                <Card.Link href={`https://www.imdb.com/title/${movie.imdbID}/`}>
                  More details
                </Card.Link>
                <Form onSubmit={this.onSubmit}>
                  <Form.Control
                    placeholder="Stars"
                    onChange={this.handlerStarsChange}
                  />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default MovieDetails;
