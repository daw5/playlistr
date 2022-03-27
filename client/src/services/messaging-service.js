import io from "socket.io-client";

const { uniqueNamesGenerator, starWars } = require("unique-names-generator");
const axios = require("axios");
let socket;

export const connectSocket = () => {
  const socketUrl =
    process.env.NODE_ENV === "production"
      ? window.location.hostname
      : "http://localhost:8080";
  socket = io.connect(socketUrl);
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
      const messages = response.data;
      if (messages.length < 1) return null;
      return addMessages(conversations, correspondent_id, messages);
    })
    .catch(function (error) {
      console.log(error);
    });

export const fetchMoreGroupMessages = (
  playlistId,
  conversationId,
  messagesLoaded
) =>
  axios
    .get(
      `/api/playlists/${playlistId}/conversations/${conversationId}/load-messages/${messagesLoaded}`
    )
    .then((response) => {
      const messages = response.data;
      if (messages.length < 1) return null;
      return messages;
    })
    .catch(function (error) {
      console.log(error);
    });

export const findConversationByPlaylist = (playlistId) =>
  axios
    .get(`/api/playlists/${playlistId}/conversation`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

const addMessages = (conversations, correspondent_id, messages) => {
  const updatedMessages =
    conversations[correspondent_id].messages.concat(messages);
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

export const sendGroupMessage = (
  evt,
  messageToSend,
  sender,
  group,
  playlistId
) => {
  evt.preventDefault();
  socket.emit("group-message", {
    sender,
    contents: messageToSend,
    group,
    playlist_id: playlistId,
  });
  return true;
};

export const leaveGroup = (group) => {
  socket && socket.emit("leave-group", group);
};

export const disconnectSocket = () => {
  socket && socket.close();
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

export const getUsername = (currentUser) => {
  if (currentUser) {
    return currentUser.username;
  } else {
    return uniqueNamesGenerator({
      dictionaries: [starWars],
    });
  }
};
