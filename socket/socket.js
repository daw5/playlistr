import { MessagingService } from "../services/index";
import jwt from "jsonwebtoken";

const messagingService = new MessagingService();
const clients = {};
const cookie = require("cookie");

function onDisconnect(socket) {
  socket.on("disconnect", (reason) => {
    console.log("client disconnected: ", reason);
  });
}

function getToken(socket) {
  const parsedCookie = cookie.parse(socket.handshake.headers.cookie);
  return parsedCookie.token || null;
}

function onMessage(socket, clients) {
  socket.on("message", async function (data) {
    jwt.verify(getToken(socket), process.env.PASSPORT_SECRET, function (
      err,
      decoded
    ) {
      messagingService
        .saveInteraction(decoded, data)
        .then(({ message, newConversation }) => {
          if (clients[data.reciever_id]) {
            clients[data.reciever_id].send({
              correspondent: decoded._id,
              message,
              newConversation,
            });
          }
          socket.send({
            correspondent: data.reciever_id,
            message,
            newConversation,
          });
        });
    });
  });
}

function onGroupMessage(io, socket) {
  socket.on("group-message", async function (data) {
    io.in(data.group).emit("group-message", {
      correspondent: data.correspondent,
      message: data.messageToSend,
    });
  });
}

function handleGroups(socket) {
  socket.on("join-group", async function (group, previousGroup) {
    previousGroup && socket.leave(previousGroup);
    socket.join(group);
  });

  socket.on("leave-group", function (group) {
    socket.leave(group);
  });
}

export function initializeSocketServer(io) {
  io.on("connect", function (socket) {
    const token = getToken(socket);
    if (token) {
      jwt.verify(getToken(socket), process.env.PASSPORT_SECRET, function (
        err,
        decoded
      ) {
        clients[decoded._id] = socket;
        onMessage(socket, clients);
      });
    }
    handleGroups(socket);
    onGroupMessage(io, socket);
    onDisconnect(socket);
  });
}
