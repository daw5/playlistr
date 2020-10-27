import { Component } from "react";

require("dotenv").config();

const axios = require("axios");

class UserService extends Component {
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

  getConversations = (currentUser) =>
    axios
      .get(`/users/conversations`)
      .then((response) => {
        return this.indexConversationsByCorrespondent(
          response.data,
          currentUser
        );
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

  indexConversationsByCorrespondent = (conversations, currentUser) => {
    const indexedConversations = {};
    conversations.forEach((conversation) => {
      indexedConversations[
        conversation.users[0] !== currentUser
          ? conversation.users[0]
          : conversation.users[1]
      ] = conversation;
    });
    return indexedConversations;
  };
}

export default UserService;
