"use strict";

var _path = _interopRequireDefault(require("path"));

var _passport = require("./store/passport");

var _socket = require("./socket/socket");

var _controller = require("./controller");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport2 = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config();

var PORT = process.env.PORT;
var SOCKET_PORT = process.env.SOCKET_PORT;

var express = require("express");

var http = require("http");

var app = express();
var server = http.createServer();

var cookieParser = require("cookie-parser");

var socket = require("socket.io");

var io = socket(server);

var connectDb = require("./database/connection");

(0, _passport.applyPassportStrategy)(_passport2["default"]);
(0, _socket.initializeSocketServer)(io);
app.use(express["static"](_path["default"].join(__dirname, "client", "build")));
app.use(cookieParser());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use("/api/auth", _controller.authController);
app.use("/api/users", _controller.userController);
app.use("/api/playlists", _controller.playlistController);
app.use("/mailing", _controller.mailingController);
app.listen(PORT, function () {
  console.log("Listening on ".concat(PORT));
  connectDb().then(function () {
    console.log("Mongo connected");
  });
});
server.listen(SOCKET_PORT, function () {
  return console.log("Socket server listening on ".concat(SOCKET_PORT));
});
