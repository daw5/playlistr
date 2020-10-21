import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

require("dotenv").config();

const axios = require("axios");

class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      recipient: null,
    };
  }
  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get(`/users`)
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  selectRecipient = (evt) => {
    this.setState({ [recipient]: this.state.users[evt.target.value] }, () => {
      console.log("state: ", this.state);
    });
  };

  render() {
    return (
      <Autocomplete
        id="users-list"
        name="recipient"
        options={this.state.users}
        onChange={this.handleChange}
        getOptionLabel={(option) => option.email}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="User" variant="outlined" />
        )}
      />
    );
  }
}

export default AutoComplete;
