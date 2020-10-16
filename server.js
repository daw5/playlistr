require("dotenv").config();
import { applyPassportStrategy } from "./store/passport";
import { authController, mailingController } from "./controller";
import bodyParser from "body-parser";
import passport from "passport";

const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;

const socketioJwt = require("socketio-jwt");
const express = require("express");
const http = require("http");
const socket = require("socket.io");
const app = express();
const server = http.createServer();
const io = socket(server);
const connectDb = require("./database/connection");

applyPassportStrategy(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", authController);
app.use("/mailing", mailingController);

io.sockets
  .on(
    "connection",
    socketioJwt.authorize({
      secret: process.env.PASSPORT_SECRET,
      timeout: 15000,
    })
  )
  .on("authenticated", function (socket) {
    console.log("authenticaed: ", socket.decoded_token);
    require("./socket/listeners").default(socket);
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
