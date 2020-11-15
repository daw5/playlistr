require("dotenv").config();

const axios = require("axios");

export const getCurrentUser = () =>
  axios
    .get(`/api/users/current`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

export const getUsers = () =>
  axios
    .get(`/api/users`)
    .then((response) => {
      const usersWithUsernames = response.data.filter((user) => user.username);
      return indexUsers(usersWithUsernames);
    })
    .catch(function (error) {
      console.log(error);
    });

export const getConversations = (currentUser) =>
  axios
    .get(`/api/users/current/conversations`)
    .then((response) => {
      return indexConversationsByCorrespondent(response.data, currentUser);
    })
    .catch(function (error) {
      console.log(error);
    });

export const setUsername = (userId, username) =>
  axios
    .put(`/api/users/current/set-username`, { _id: userId, username })
    .then((response) => {
      console.log("response: ", response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });

const indexConversationsByCorrespondent = (conversations, currentUser) => {
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

const indexUsers = (users) => {
  const indexedUsers = {};
  users.forEach((user) => {
    indexedUsers[user._id] = user;
  });
  return indexedUsers;
};
