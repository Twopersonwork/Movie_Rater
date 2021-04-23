import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Search from "./Search";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends Component {
  render() {
    return (
      // we use bootstrap for NavBar
      <div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">Movie Rater</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            {/* if button clicked then it redirects to the login page */}
            <Link to={"/login"}>
              <Button variant="outline-primary">Login</Button>
            </Link>
            {/* In header we have search component. */}
            <Search onChange={(e) => this.props.onChange(e)} />
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;
