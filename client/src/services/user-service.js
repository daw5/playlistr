require("dotenv").config();

const axios = require("axios");

export default class UserService {
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
        const users = this.indexUsers(response.data);
        return users;
      })
      .catch(function (error) {
        console.log(error);
      });

  getConversations = (currentUser) =>
    axios
      .get(`/users/current/conversations`)
      .then((response) => {
        return this.indexConversationsByCorrespondent(
          response.data,
          currentUser
        );
      })
      .catch(function (error) {
        console.log(error);
      });

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

  indexUsers = (users) => {
    const indexedUsers = {};
    users.forEach((user) => {
      indexedUsers[user._id] = user;
    });
    return indexedUsers;
  };
}
