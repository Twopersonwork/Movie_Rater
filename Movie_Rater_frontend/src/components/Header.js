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
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
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
