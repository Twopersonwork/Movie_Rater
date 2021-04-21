import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
// import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import login from "./components/login";
import { CookiesProvider, withCookies } from "react-cookie";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchkeyword: "",
    };
  }

  onChange = (e) => {
    this.setState({
      searchkeyword: e.target.value,
    });
    console.log(this.state.searchkeyword);
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header onChange={this.onChange} />
          <Switch>
            <Route exact path="/login" component={login} />

            <Route
              exact
              path="/"
              component={() => (
                <MovieList searchkeyword={this.state.searchkeyword} />
              )}
            />
            <Route
              exact
              path="/movies"
              component={() => (
                <MovieList searchkeyword={this.state.searchkeyword} />
              )}
            />

            <Route exact path="/movies/:id" component={MovieDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default withCookies(App);
