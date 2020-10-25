require("dotenv").config();
import { applyPassportStrategy } from "./store/passport";
import {
  authController,
  mailingController,
  userController,
} from "./controller";
import bodyParser from "body-parser";
import passport from "passport";

const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;

const socketCookieParser = require("socket.io-cookie-parser");
const socketioJwt = require("socketio-jwt");
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const server = http.createServer();
const io = socket(server);
const connectDb = require("./database/connection");
const cookieParser = require("cookie-parser");
const clients = {};

applyPassportStrategy(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", authController);
app.use("/users", userController);
app.use("/mailing", mailingController);
io.use(socketCookieParser());

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
    require("./socket/listeners").default(socket, clients);
    socket.on("disconnect", (reason) => {
      console.log("client disconnected: ", reason);
      delete clients[socket.decoded_token._id];
    });
  });

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("Mongo connected");
  });
});

server.listen(SOCKET_PORT, () =>
  console.log(`Socket server listening on ${SOCKET_PORT}`)
);
