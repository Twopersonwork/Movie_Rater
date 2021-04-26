import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";

const formControl = {
  minWidth: "140px",
  // display: "flex",
  margin: "11px",
};

class Filter extends Component {
  constructor(props) {
    super(props);
    this.Country = React.createRef();
    this.Genre = React.createRef();
    this.Language = React.createRef();

    this.state = {
      searchWordc: "",
      searchWordg: "",
      searchWordl: "",
      country: "",
      genre: "",
      language: "",
    };
  }

  handleChangeCountry = (e) => {
    this.setState(
      {
        searchWordc: e.target.value,
        country: this.Country.current.innerText,
      },
      function () {
        if (this.state.country && this.state.genre && this.state.language) {
          this.props.handleFilterSearch(
            [
              this.state.searchWordc,
              this.state.searchWordg,
              this.state.searchWordl,
            ],
            [this.state.country, this.state.genre, this.state.language]
          );
        } else if (this.state.country && this.state.genre) {
          this.props.handleFilterSearch(
            [this.state.searchWordc, this.state.searchWordg],
            [this.state.country, this.state.genre]
          );
        } else if (this.state.country && this.state.language) {
          this.props.handleFilterSearch(
            [this.state.searchWordc, this.state.searchWordl],
            [this.state.country, this.state.language]
          );
        } else {
          this.props.handleFilterSearch(
            [this.state.searchWordc],
            [this.state.country]
          );
        }
      }
    );
    e.preventDefault();
  };
  handleChangeGenre = (e) => {
    this.setState(
      {
        searchWordg: e.target.value,
        genre: this.Genre.current.innerText,
      },
      function () {
        if (this.state.country && this.state.genre && this.state.language) {
          this.props.handleFilterSearch(
            [
              this.state.searchWordc,
              this.state.searchWordg,
              this.state.searchWordl,
            ],
            [this.state.country, this.state.genre, this.state.language]
          );
        } else if (this.state.genre && this.state.language) {
          this.props.handleFilterSearch(
            [this.state.searchWordg, this.state.searchWordl],
            [this.state.genre, this.state.language]
          );
        } else if (this.state.country && this.state.genre) {
          this.props.handleFilterSearch(
            [this.state.searchWordc, this.state.searchWordg],
            [this.state.country, this.state.genre]
          );
        } else {
          this.props.handleFilterSearch(
            [this.state.searchWordg],
            [this.state.genre]
          );
        }
      }
    );
    e.preventDefault();
  };
  handleChangeLanguage = (e) => {
    this.setState(
      {
        searchWordl: e.target.value,
        language: this.Language.current.innerText,
      },
      function () {
        if (this.state.country && this.state.genre && this.state.language) {
          this.props.handleFilterSearch(
            [
              this.state.searchWordc,
              this.state.searchWordg,
              this.state.searchWordl,
            ],
            [this.state.country, this.state.genre, this.state.language]
          );
        } else if (this.state.genre && this.state.language) {
          this.props.handleFilterSearch(
            [this.state.searchWordg, this.state.searchWordl],
            [this.state.genre, this.state.language]
          );
        } else if (this.state.country && this.state.language) {
          this.props.handleFilterSearch(
            [this.state.searchWordc, this.state.searchWordl],
            [this.state.country, this.state.language]
          );
        } else {
          this.props.handleFilterSearch(
            [this.state.searchWordl],
            [this.state.language]
          );
        }
      }
    );
    e.preventDefault();
  };

  render() {
    return (
      <Grid container>
        <Grid item>
          <FormControl variant="outlined" style={formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              ref={this.Country}
            >
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Country"
              value={this.state.searchWordc}
              onChange={this.handleChangeCountry}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Japan">Japan</MenuItem>
              <MenuItem value="China">China</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" style={formControl}>
            <InputLabel id="demo-simple-select-outlined-label" ref={this.Genre}>
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Genre"
              value={this.state.searchWordg}
              onChange={this.handleChangeGenre}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Action">Action</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" style={formControl}>
            <InputLabel
              id="demo-simple-select-outlined-label"
              ref={this.Language}
            >
              Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Language"
              value={this.state.searchWordl}
              onChange={this.handleChangeLanguage}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="Hindi">Hindi</MenuItem>
              <MenuItem value="Spanish">Spanish</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default Filter;
