import io from "socket.io-client";
const axios = require("axios");

const socket = io.connect("http://localhost:4001");

export default class MessagingService {
  authenticateSocket() {
    socket.on("connect", function () {
      socket
        .emit("authenticate")
        .on("authenticated", () => {
          console.log("socket authentication complete");
        })
        .on("unauthorized", (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        });
    });
    return socket;
  }

  fetchMoreMessages = (messagesLoaded, conversation_id) => {
    axios
      .get(
        `/users/current/conversations/${conversation_id}/load-messages/${messagesLoaded}`
      )
      .then((response) => {
        console.log("loaded messages: ", response.data);
        return true;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  sendPrivateMessage = (evt, messageToSend, correspondent_id) => {
    evt.preventDefault();
    this.sendMessage(correspondent_id, messageToSend);
    return true;
  };

  sendMessage(reciever_id, contents) {
    socket.emit("message", { reciever_id, contents });
  }

  getUsersRelevantToConversation(users, conversation) {
    const relevantUsers = {};
    conversation.users.forEach((user) => {
      relevantUsers[user] = users[user];
    });
    return relevantUsers;
  }

  updateConversations = (latestMessage, conversations) => {
    let updatedConversations = conversations;
    if (latestMessage) {
      if (latestMessage.newConversation) {
        updatedConversations[latestMessage.correspondent] =
          latestMessage.newConversation;
      } else {
        updatedConversations[latestMessage.correspondent].messages.unshift(
          latestMessage.message
        );
      }
    }
    return updatedConversations;
  };
}
