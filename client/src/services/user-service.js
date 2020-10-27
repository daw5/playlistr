import { Component } from "react";

require("dotenv").config();

const axios = require("axios");

class UserService extends Component {
  getCorrespondent = (currentUser, relevantUserIds, users) => {
    return relevantUserIds[0] !== currentUser
      ? users[relevantUserIds[0]]
      : users[relevantUserIds[1]];
  };

  getCurrentUser = () =>
    axios
      .get(`/users/current`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  getUsers = () =>
    axios
      .get(`/users`)
      .then((response) => {
        const users = this.indexItems(response.data);
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
        return this.indexItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  indexItems = (items) => {
    const indexedItems = {};
    items.forEach((item) => {
      indexedItems[item._id] = item;
    });
    return indexedItems;
  };
}

export default UserService;
