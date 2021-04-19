import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
// import { Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

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
            <Route
              path="/"
              exact
              component={MovieList}
              searchkeyword={this.state.searchkeyword}
            />
            <Route path="/:id" component={MovieDetails} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
