import { MessagingService } from "../services/index";

const socketCookieParser = require("socket.io-cookie-parser");
const messagingService = new MessagingService();
const socketioJwt = require("socketio-jwt");
const clients = {};

function onDisconnect(socket) {
  socket.on("disconnect", (reason) => {
    console.log("client disconnected: ", reason);
  });
}

function onMessage(socket, clients) {
  socket.on("message", async function (data) {
    const { message, newConversation } = await messagingService.saveInteraction(
      socket.decoded_token,
      data
    );
    if (clients[data.reciever_id]) {
      clients[data.reciever_id].send({
        correspondent: socket.decoded_token._id,
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
}

export function initializeSocketServer(io) {
  io.use(socketCookieParser());
  io.on("connect", function (socket) {
    onDisconnect(socket);
    socket.on("join-group", async function (group, previousGroup) {
      previousGroup && socket.leave(previousGroup);
      socket.join(group);
    });

    socket.on("leave-group", function (group) {
      socket.leave(group);
    });

    socket.on("group-message", async function (data) {
      console.log("is this message actually being sent twice ", data);
      io.in(data.group).emit("group-message", {
        correspondent: data.correspondent,
        message: data.messageToSend,
      });
    });
  });

  io.sockets
    .on(
      "connection",
      socketioJwt.authorize({
        secret: process.env.PASSPORT_SECRET,
        timeout: 15000,
        cookie: "token",
      })
    )
    .on("authenticated", function (socket) {
      clients[socket.decoded_token._id] = socket;
      console.log("authenticated: ", socket.decoded_token);
      onMessage(socket, clients);
      onDisconnect(socket);
    });
}
