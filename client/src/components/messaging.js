import React, { Component } from "react";
require("dotenv").config();
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

  handleChange = (evt) => {
    this.setState({
      users: this.state.users.push(evt),
    });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map((user) => (
            <li key={`user_${user._id}`} name="user" value={user}>
              {user.email}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Messaging;
