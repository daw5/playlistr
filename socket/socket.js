import { MessagingService } from "../services/index";
import jwt from "jsonwebtoken";

const messagingService = new MessagingService();
const clients = {};
const cookie = require("cookie");

function getToken(socket) {
  const parsedCookie =
    typeof socket.handshake.headers.cookie === "string" &&
    cookie.parse(socket.handshake.headers.cookie);
  return parsedCookie.token || null;
}

function onDisconnect(socket) {
  socket.on("disconnect", (reason) => {
    console.log("client disconnected: ", reason);
  });
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

function getRooms(io) {
  const realRooms = Object.keys(io.sockets.adapter.rooms).reduce(
    (filtered, key) => {
      if (!io.sockets.adapter.rooms[key].sockets.hasOwnProperty(key))
        filtered.push(io.sockets.adapter.rooms[key]);
      return filtered;
    },
    []
  );
  return realRooms;
}

function onGroupMessage(io, socket) {
  socket.on("group-message", async function (data) {
    io.in(data.group).emit("group-message", {
      correspondent: data.correspondent,
      message: data.messageToSend,
    });
  });
}

function listPopularPlaylists(io, socket) {
  socket.on("get-popular-playlists", function () {
    const popularPlaylists = getRooms(io).sort(
      ({ length: a }, { length: b }) => b - a
    );
    socket.send("popular-playlists", popularPlaylists);
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
    listPopularPlaylists(io, socket);
    onGroupMessage(io, socket);
    onDisconnect(socket);
  });
}
