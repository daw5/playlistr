require("dotenv").config();

const axios = require("axios");

export default class UserService {
  getCurrentUser = () =>
    axios
      .get(`/api/users/current`)
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

  getUsers = () =>
    axios
      .get(`/api/users`)
      .then((response) => {
        const usersWithUsernames = response.data.filter(
          (user) => user.username
        );
        return this.indexUsers(usersWithUsernames);
      })
      .catch(function (error) {
        console.log(error);
      });

  getConversations = (currentUser) =>
    axios
      .get(`/api/users/current/conversations`)
      .then((response) => {
        return this.indexConversationsByCorrespondent(
          response.data,
          currentUser
        );
      })
      .catch(function (error) {
        console.log(error);
      });

  setUsername = (userId, username) =>
    axios
      .put(`/api/users/current/set-username`, { _id: userId, username })
      .then((response) => {
        console.log("response: ", response);
        return response;
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
