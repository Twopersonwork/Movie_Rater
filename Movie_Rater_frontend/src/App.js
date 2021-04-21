import "./App.css";
import { Component } from "react";
import Header from "./components/Header";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from "./components/MovieList";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchkeyword: "", // this is for store the search keyword
    };
  }

  /*
  This method store the search value in search keyword when user search.
   */
  onChange = (e) => {
    this.setState({
      searchkeyword: e.target.value,
    });
  };

  render() {
    return (
      // BrowserRouter for routing in different component
      <BrowserRouter>
        <div className="App">
          {/* Header component, it calls the onChange method for changing the searchkeyword */}
          <Header onChange={this.onChange} />
          <Switch>
            {/* This is main (home) route in which all the movies will diasplay. */}
            <Route
              exact
              path="/"
              component={() => (
                <MovieList searchkeyword={this.state.searchkeyword} />
              )}
            />

            {/* This is same as home router. But only path changes */}
            <Route
              exact
              path="/movies"
              component={() => (
                <MovieList searchkeyword={this.state.searchkeyword} />
              )}
            />
            {/* This component is for Signup. */}
            <Route exact path="/signup">
              <SignUp />
            </Route>
            {/* This component is for login. */}
            <Route exact path="/login">
              <Login />
            </Route>
            {/* This component is used for when user clicked on any movie, now user can see all the
            details of particular movie. */}
            <Route
              exact
              path="/movies/:id"
              render={(props) => <MovieDetails {...props} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
