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
  trackDetailsController,
  reactRouterController,
} from "./controller";
import bodyParser from "body-parser";
import passport from "passport";

const PORT = process.env.PORT || 8080;

const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
const io = require("socket.io")(server);
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
app.use("/api/track-details", trackDetailsController);
app.use("/mailing", mailingController);
app.use("/", reactRouterController);

server.listen(PORT, () => {
  connectDb().then(() => {
    console.log("Mongo connected");
  });
  console.log(`Socket server listening on ${PORT}`);
});
