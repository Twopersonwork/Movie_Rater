import React, { Component } from "react";
import SearchBar from "material-ui-search-bar";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  render() {
    const { onChange } = this.props;
    return (
      <div>
        <SearchBar
          value={this.state.value}
          onChange={(newValue) =>
            this.setState({ value: newValue }, () => onChange(this.state.value))
          }
          onRequestSearch={() => onChange(this.state.value)}
          style={{
            margin: "0 auto",
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}

export default Search;
