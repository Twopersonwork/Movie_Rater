import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRedirect: false,
    };
  }

  setParams = () => {
    this.props.setLoginPara(false);
    this.setState({ isRedirect: !this.state.isRedirect });
  };

  render() {
    console.log("isLogin from app", this.props.isLogin);
    return (
      // we use bootstrap for NavBar
      <div>
        <Navbar fixed="top" bg="light" expand="lg">
          <Navbar.Brand href="/">Movie Rater</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">
                <HomeIcon
                  style={{ fontSize: 32, color: "rgb(124, 167, 215)" }}
                />
              </Nav.Link>
            </Nav>

            {/* if button clicked then it redirects to the login page */}

            {/* In header we have search component. */}
            <Nav className="mr-auto" style={{ flex: "inline" }}>
              <Search onChange={(e) => this.props.onChange(e)} />
            </Nav>

            <Nav.Link href="#">
              <AccountCircleIcon
                style={{ fontSize: 32, color: "rgb(124, 167, 215)" }}
              />
              <span style={{ margin: "10px" }}>{this.props.user}</span>
            </Nav.Link>
            {/* {this.props.isLogin ? (
              <Button variant="outline-primary" onClick={this.setParams}>
                Logout
              </Button>)?this.state.isRedirect?<Redirect href="/"/>:(null)
            : (
              <Link to={"/login"}>
                <Button variant="outline-primary">Login</Button>
              </Link>
            )} */}

            {this.props.isLogin ? (
              <Button variant="outline-primary" onClick={this.setParams}>
                Logout
              </Button>
            ) : (
              <Link to={"/login"}>
                <Button variant="outline-primary">Login</Button>
              </Link>
            )}

            {this.state.isRedirect ? <Redirect href="/" /> : null}

            <Nav></Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
