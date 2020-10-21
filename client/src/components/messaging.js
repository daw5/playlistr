// require("dotenv").config();

import React, { Component } from "react";
import { AutoComplete } from "./index";

const axios = require("axios");

class Messaging extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
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

  render() {
    return (
      <div>
        <AutoComplete />
      </div>
    );
  }
}

export default Messaging;
