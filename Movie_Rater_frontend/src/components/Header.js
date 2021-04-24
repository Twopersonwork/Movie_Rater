import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { withCookies } from "react-cookie";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      // we use bootstrap for NavBar
      <div>
        <Navbar fixed="top" bg="light" expand="lg">
          <Navbar.Brand href="/">Movie Rater</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="mr-auto flex-column">
              <Nav.Link href="/">
                <HomeIcon
                  style={{ fontSize: 32, color: "rgb(124, 167, 215)" }}
                />
              </Nav.Link>
            </Nav>
            <Nav className="mr-auto">
              <Search onChange={(e) => this.props.onChange(e)} />
            </Nav>
            {/* if button clicked then it redirects to the login page */}

            {/* In header we have search component. */}
            <Nav className="justify-content-end flex-column">
              <Nav.Link href="#">
                <AccountCircleIcon
                  style={{ fontSize: 32, color: "rgb(124, 167, 215)" }}
                />
                {/* <span style={{ margin: "10px" }}>{this.props.user}</span> */}
              </Nav.Link>
            </Nav>

            {/* Here we just check if user is authenticated or not if not then show Login and if yes then show logout. */}
            {this.props.cookies.get("auth-token") ? (
              <Link to={"/"}>
                <Button
                  variant="outline-primary"
                  onClick={() => this.props.cookies.remove("auth-token")}
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <Button variant="outline-primary">Login</Button>
              </Link>
            )}
            {/* <Nav></Nav> */}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withCookies(Header);
