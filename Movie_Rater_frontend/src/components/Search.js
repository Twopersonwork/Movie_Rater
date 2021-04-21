import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Search extends Component {
  render() {
    const { onChange } = this.props;
    return (
      <div>
        {/* Here simple search form */}
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            onChange={onChange}
          />
          <Link to={'/'}>
            {/* when you clicked on search button it redirects to the main page. */}
            <Button variant="outline-success">Search</Button>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Search;
