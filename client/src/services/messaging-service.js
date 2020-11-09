import io from "socket.io-client";

const axios = require("axios");
let socket = io.connect("http://localhost:4001");

export default class MessagingService {
  authenticateSocket() {
    socket = io.connect("http://localhost:4001");
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

  fetchMoreMessages = (conversations, correspondent_id) =>
    axios
      .get(
        `/users/current/conversations/${conversations[correspondent_id]._id}/load-messages/${conversations[correspondent_id].messages.length}`
      )
      .then((response) => {
        return this.addMessages(conversations, correspondent_id, response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  addMessages = (conversations, correspondent_id, messages) => {
    const updatedMessages = conversations[correspondent_id].messages.concat(
      messages
    );
    let updatedConversations = conversations;
    updatedConversations[correspondent_id].messages = updatedMessages;
    return updatedConversations;
  };

  sendPrivateMessage = (evt, messageToSend, correspondent_id) => {
    evt.preventDefault();
    socket.emit({ reciever_id: correspondent_id, contents: messageToSend });
    return true;
  };

  sendGroupMessage = (evt, messageToSend, correspondent, group) => {
    evt.preventDefault();
    console.log("gettins sent");
    socket.emit("group-message", { correspondent, messageToSend, group });
    return true;
  };

  disconnectSocket() {
    socket.close();
    socket = null;
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
