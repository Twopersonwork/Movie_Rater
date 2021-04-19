import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

class Search extends Component {
  render() {
    const { onChange } = this.props;
    return (
      <div>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={onChange}
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
    );
  }
}

export default Search;
