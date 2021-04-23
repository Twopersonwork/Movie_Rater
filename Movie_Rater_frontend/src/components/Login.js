import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import { Alert } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {   // this is for store the user credentials like username and password
        username: "",
        password: "",
      },
      errorMsg: "",       // store the errorMsg if any
      errorNum: "",       // store the errorNum if any
      showerror: false,   // if error present then only this will become true
    };
  } 

  // this method execute when user typed their username and email for storeing into creadentials

  inputChanged = (event) => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
    // console.log(this.state.credentials);
  };


  /* 
  this method will run when user clicked on login.
  it will get the token from the server for particular user 
  ,so Now user have access to rate the movies.
  and also set token in cookies.

  */ 
  login = (event) => {
    this.setState({ showerror: true });
    fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.credentials),
    })
      .then((resp) => resp.json())
      .then((res) => {
        if (res.token) {
          this.props.cookies.set("auth-token", res.token);
          window.location.href = "/";
        } else {
          this.setState({ errorMsg: res.error, errorNum: res.msg });
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
          <form className={form} onSubmit={this.login}>
            <Grid container spacing={2} style={{ marginTop: "40%" }}>
              <Grid item xs={12}>

                {/* This two conditions for showing the error messgae */}
                {this.state.showerror && this.state.errorNum == 2 ? (
                  <Alert
                    variant="danger"
                    onClick={() => this.setState({ showerror: false })}
                    dismissible
                  >
                    {this.state.errorMsg}
                  </Alert>
                ) : null}

               
                {this.state.showerror && this.state.errorNum == 1 ? (
                  <Alert
                    variant="danger"
                    onClick={() => this.setState({ showerror: false })}
                    dismissible
                  >
                    {this.state.errorMsg}
                  </Alert>
                ) : null}
                {/* This textfield for username */}
                <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  id="username"
                  value={this.state.credentials.username}
                  label="User Name"
                  name="username"
                  onChange={this.inputChanged}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                {/* This textfield for email */}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="password"
                  name="password"
                  label="Password"
                  id="password"
                  value={this.state.credentials.password}
                  onChange={this.inputChanged}
                />
              </Grid>
              <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={submit}
              >
                Log in
              </Button>
            </Grid>
            </Grid>
           

            <Grid container justify="center" className="mt-3">
              <Grid item>
                {/* Route to the signup page */}
                <Link to={"/signup"}>create an account? Sign in</Link>  
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

// This is soem CSS for login page
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

const submit = {
  margin: "2px",
};

export default withCookies(Login);
