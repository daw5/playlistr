import { MessagingService, PlaylistService } from "../services/index";
import jwt from "jsonwebtoken";

const messagingService = new MessagingService();
const playlistService = new PlaylistService();
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
    jwt.verify(
      getToken(socket),
      process.env.PASSPORT_SECRET,
      function (err, decoded) {
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
      }
    );
  });
}

function getRooms(rooms) {
  const realRooms = Object.keys(rooms).reduce((filtered, key) => {
    if (!rooms[key].sockets.hasOwnProperty(key)) {
      const room = rooms[key];
      room.playlistId = key;
      filtered.push(room);
    }
    return filtered;
  }, []);
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

function listActivePlaylists(io, socket) {
  socket.on("get-active-playlists", async function (data) {
    const activeRooms = getRooms(io.sockets.adapter.rooms).sort(
      ({ length: a }, { length: b }) => b - a
    );
    const activePlaylistIds = activeRooms.map((playlist) => {
      return playlist.playlistId;
    });
    const activePlaylists = await playlistService.findPlaylistsById(
      activePlaylistIds
    );
    const recentPlaylists = await playlistService.listRecentPlaylists(10, true);
    const playlists = activePlaylists.concat(recentPlaylists);

    socket.emit("get-active-playlists", playlists);
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
      jwt.verify(
        getToken(socket),
        process.env.PASSPORT_SECRET,
        function (err, decoded) {
          clients[decoded._id] = socket;
          onMessage(socket, clients);
        }
      );
    }
    handleGroups(socket);
    listActivePlaylists(io, socket);
    onGroupMessage(io, socket);
    onDisconnect(socket);
  });
}
