import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      created: false, // for checking if account is created or not.
      usernameError: "", // store the username error
      emailError: "", // store the email error
      credentials: {
        // user credentials
        username: "",
        email: "",
        password: "",
      },
    };
  }

  // this method execute when user typed their username,email and password for storering into creadentials

  inputChanged = (event) => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
    console.log(this.state.credentials);
  };

  // when user clicked on signup then this method post the user credentials to the server for creating new user.
  signup = (event) => {
    console.log("hello");
    fetch("http://127.0.0.1:8000/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.credentials),
    })
      .then((resp) => resp.json())
      .then((res) => {
        // This is for checking if user credentials have any errors or not.
        if (res.id) {
          console.log("allfine", res);
          this.setState({ created: true });
        } else {
          console.log("notfine", res);
          if (res.username) {
            this.setState({ usernameError: res.username[0] });
          }
          if (res.email) {
            this.setState({ emailError: res.email[0] });
          }
        }
      })
      .catch((error) => console.log(error));

    event.preventDefault();
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={paper}>
          <form className={form} onSubmit={this.signup}>
            <Grid container spacing={2} style={{ marginTop: "40%" }}>
              <Grid item xs={12}>
                {/* For check username errors */}
                {this.state.usernameError.length > 0 ? (
                  <Alert
                    variant="danger"
                    onClick={() => this.setState({ usernameError: "" })}
                    dismissible
                  >
                    {this.state.usernameError}
                  </Alert>
                ) : null}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                  onChange={this.inputChanged}
                />
              </Grid>

              <Grid item xs={12}>
                {/* For check email error */}
                {this.state.emailError.length > 0 ? (
                  <Alert
                    variant="danger"
                    onClick={() => this.setState({ emailError: "" })}
                    dismissible
                  >
                    {this.state.emailError}
                  </Alert>
                ) : null}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email id"
                  name="email"
                  autoComplete="email"
                  onChange={this.inputChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.inputChanged}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>

            <Grid container justify="center" className="mt-2">
              <Grid item>
                <Link to={"/login"}>Already have an account? Log in</Link>
              </Grid>
            </Grid>
            {this.state.created ? <Redirect to={"/login"} /> : null}
          </form>
        </div>
      </Container>
    );
  }
}

// This is some css for signup
const paper = {
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const form = {
  width: "100%",
  marginTop: "3px",
};

export default SignUp;
