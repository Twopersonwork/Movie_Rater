import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }
  handlerUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
    console.log(this.state.password);
  };
  handlerPasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
    console.log(this.state.username);
  };
  onLogin = (e) => {
    fetch("http://127.0.0.1:8000/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        // console.log("token login", resp.token);
        this.props.cookies.set("auth-token", resp.token);
        window.location.href = "/movies";
      })
      .catch((error) => console.log(error));

    e.preventDefault();
  };

  render() {
    // console.log("token", this.props.cookies.get("auth-token"));
    return (
      <div>
        <h1>Login</h1>
        <Form onSubmit={this.onLogin}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="username"
            onChange={this.handlerUsernameChange}
          />
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="password"
            onChange={this.handlerPasswordChange}
          />

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default withCookies(login);
