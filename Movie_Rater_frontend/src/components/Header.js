import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withCookies } from "react-cookie";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  local = () => {
    this.props.cookies.remove("auth-token");
    localStorage.removeItem("user");
  };

  render() {
    return (
      // we use bootstrap for NavBar
      <div>
        <Navbar fixed="top" bg="light" expand="lg">
          <Navbar.Brand href="/">Movie Rater</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse>
            <Nav className="m-auto flex-column">
              <Search onChange={(e) => this.props.onChange(e)} />
            </Nav>
            {/* if button clicked then it redirects to the login page */}

            {/* In header we have search component. */}
            {this.props.cookies.get("auth-token") ? (
              <Nav className="justify-content-end">
                <Nav.Link href="#">
                  <AccountCircleIcon
                    style={{ fontSize: 32, color: "rgb(124, 167, 215)" }}
                  />
                  <span style={{ margin: "10px" }}>
                    {JSON.parse(localStorage.getItem("user"))}
                  </span>
                </Nav.Link>
              </Nav>
            ) : null}

            {/* Here we just check if user is authenticated or not if not then show Login and if yes then show logout. */}
            {this.props.cookies.get("auth-token") ? (
              <Link to={"/"}>
                <Button variant="outline-primary" onClick={this.local}>
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <Button variant="outline-primary">Login</Button>
              </Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withCookies(Header);
