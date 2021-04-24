import React, { Component } from "react";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";

class Search extends Component {
  onClick = () => {
    <Redirect to="/movies" />;
  };
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
            onClick={this.onClick}
          />

          <Link to={"/movies"}>
            {/* when you clicked on search button it redirects to the main page. */}
            <SearchIcon variant="outline-success">Search</SearchIcon>
          </Link>
        </Form>
      </div>
    );
  }
}

export default Search;
