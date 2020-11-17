import io from "socket.io-client";

const axios = require("axios");
let socket;

export const connectSocket = () => {
  socket = io.connect("http://localhost:8080");
  return socket;
};

export const authenticateSocket = () => {
  socket = connectSocket();
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
};

export const fetchMoreMessages = (conversations, correspondent_id) =>
  axios
    .get(
      `/api/users/current/conversations/${conversations[correspondent_id]._id}/load-messages/${conversations[correspondent_id].messages.length}`
    )
    .then((response) => {
      return addMessages(conversations, correspondent_id, response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

const addMessages = (conversations, correspondent_id, messages) => {
  const updatedMessages = conversations[correspondent_id].messages.concat(
    messages
  );
  let updatedConversations = conversations;
  updatedConversations[correspondent_id].messages = updatedMessages;
  return updatedConversations;
};

export const sendPrivateMessage = (evt, messageToSend, correspondent_id) => {
  evt.preventDefault();
  socket.emit("message", {
    reciever_id: correspondent_id,
    contents: messageToSend,
  });
  return true;
};

export const sendGroupMessage = (evt, messageToSend, correspondent, group) => {
  evt.preventDefault();
  socket.emit("group-message", { correspondent, messageToSend, group });
  return true;
};

export const leaveGroup = (group) => {
  socket.emit("leave-group", group);
};

export const disconnectSocket = () => {
  socket.close();
  socket = null;
};

export const updateConversations = (latestMessage, conversations) => {
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
