import { SocketService } from "./index";

require("dotenv").config();

const axios = require("axios");
const socketService = new SocketService();

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

  getMessages = (conversations, correspondent) => {
    return conversations.hasOwnProperty(correspondent)
      ? conversations[correspondent].messages
      : [];
  };

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

  sendPrivateMessage = (evt, messageToSend, correspondent_id) => {
    if (evt.key === "Enter" || evt.type === "click") {
      evt.preventDefault();
      socketService.sendMessage(correspondent_id, messageToSend);
      return true;
    }
  };

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
