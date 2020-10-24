import { Component } from "react";

require("dotenv").config();

const axios = require("axios");

class UserService extends Component {
  getUsers = () =>
    axios
      .get(`/users`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  getConversations = () =>
    axios
      .get(`/users/conversations`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
}

export default UserService;
