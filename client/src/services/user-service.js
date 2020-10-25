import { Component } from "react";

require("dotenv").config();

const axios = require("axios");

class UserService extends Component {
  getUsers = () =>
    axios
      .get(`/users`)
      .then((response) => {
        const users = this.indexUsers(response.data);
        return users;
      })
      .catch(function (error) {
        console.log(error);
      });

  getUsersRelevantToConversation(users, conversation) {
    const relevantUsers = {};
    conversation.users.forEach((user) => {
      relevantUsers[user] = users[user];
    });
    return relevantUsers;
  }

  getConversations = () =>
    axios
      .get(`/users/conversations`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  indexUsers = (users) => {
    const indexedUsers = {};
    users.forEach((user) => {
      indexedUsers[user._id] = user;
    });
    return indexedUsers;
  };
}

export default UserService;
