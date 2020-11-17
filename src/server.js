require("dotenv").config();
import "regenerator-runtime/runtime.js";
import path from "path";
import { applyPassportStrategy } from "./store/passport";
import { initializeSocketServer } from "./socket/socket";
import {
  authController,
  mailingController,
  userController,
  playlistController,
  reactRouterController,
} from "./controller";
import bodyParser from "body-parser";
import passport from "passport";

const PORT = process.env.PORT || 8080;
const SOCKET_PORT = process.env.SOCKET_PORT || 4001;

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer();
const cookieParser = require("cookie-parser");
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
  },
});
const connectDb = require("./database/connection");

applyPassportStrategy(passport);
initializeSocketServer(io);

app.use(express.static(path.join(__dirname, "../client", "build")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", authController);
app.use("/api/users", userController);
app.use("/api/playlists", playlistController);
app.use("/mailing", mailingController);
app.use("/", reactRouterController);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("Mongo connected");
  });
});

server.listen(SOCKET_PORT, () =>
  console.log(`Socket server listening on ${SOCKET_PORT}`)
);
