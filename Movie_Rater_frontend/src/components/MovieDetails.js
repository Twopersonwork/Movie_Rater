import React, { Component } from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { withCookies } from "react-cookie";

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieDetail: {},
      token: this.props.cookies.get("auth-token"),
      colored: -1,
      avg_rating: "",
      no_of_ratings: "",
    };
  }

  onSubmit = (stars) => (e) => {
    if (this.state.token) {
      console.log(stars);

      fetch(
        `${process.env.REACT_APP_API_URL}/api/movies/${this.props.match.params.id}/rateMovie/`,
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
        .catch((error) => console.log(error));
    }
  };

  /*
componentDidMount() will run after the render method and which ever movie user selected ,
fetch it from the server and store it in movieDetails.
*/

  fetch_data() {
    console.log("hello");
    fetch(`${process.env.REACT_APP_API_URL}/api/movies/${this.props.match.params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Token 6622e38254ac5510944a93a53ae3e5d9f6bf5c17",
      },
    })
      .then((resp) => resp.json())
      .then((res) =>
        this.setState({
          movieDetail: res,
          no_of_ratings: res.no_of_ratings,
          avg_rating: res.avg_rating,
        })
      )
      .catch((error) => console.log(error));
    console.log(this.props.match);
  }

  // this method only runs once in the life cycle
  // so we can't depend upon this when updated
  // changes are needed to be shown.
  componentDidMount() {
    this.fetch_data();
  }

  // this method is called every time an update is there
  // so the fetch data will be called every time the
  // states no_of_ratings and avg_rating will be changed
  // and it will be shown w/o refreshing the current page.
  componentDidUpdate(){
    this.fetch_data()
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
    console.log("wohooooo run");
    const movie = this.state.movieDetail;
    return (
      <Container className="mt-2">
        {/* Here we create card for store the movie poster on left side and all the movie details on
        the right side of the card. */}
        <Card>
          <Card.Body>
            <Row>
              <Col sm={8} xl lg md>
                <Card.Img
                  referrerPolicy="no-referrer"
                  variant="top"
                  src={movie.Poster}
                />
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
                    {this.state.no_of_ratings}
                  </span>
                </Card.Text>
                <Card.Text>
                  Avg Ratings:
                  <span className="text-muted forText">
                    {this.state.avg_rating}
                  </span>
                </Card.Text>
                <Card.Text>
                  Rate this:
                  <span className="mb-2 text-muted forText">
                    {[...Array(5)].map((e, i) => {
                      return (
                        <FaStar
                          size={32}
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
// for using cookies we have to export component like this.
export default withCookies(MovieDetails);
