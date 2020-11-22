"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeSocketServer = initializeSocketServer;

var _index = require("../services/index");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var messagingService = new _index.MessagingService();
var playlistService = new _index.PlaylistService();
var clients = {};

var cookie = require("cookie");

function getToken(socket) {
  var parsedCookie = typeof socket.handshake.headers.cookie === "string" && cookie.parse(socket.handshake.headers.cookie);
  return parsedCookie.token || null;
}

function onDisconnect(socket) {
  socket.on("disconnect", function (reason) {
    console.log("client disconnected: ", reason);
  });
}

function onMessage(socket, clients) {
  socket.on("message", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _jsonwebtoken["default"].verify(getToken(socket), process.env.PASSPORT_SECRET, function (err, decoded) {
                messagingService.saveInteraction(decoded, data).then(function (_ref2) {
                  var message = _ref2.message,
                      newConversation = _ref2.newConversation;

                  if (clients[data.reciever_id]) {
                    clients[data.reciever_id].send({
                      correspondent: decoded._id,
                      message: message,
                      newConversation: newConversation
                    });
                  }

                  socket.send({
                    correspondent: data.reciever_id,
                    message: message,
                    newConversation: newConversation
                  });
                });
              });

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}

function getRooms(rooms) {
  var realRooms = Object.keys(rooms).reduce(function (filtered, key) {
    if (!rooms[key].sockets.hasOwnProperty(key)) {
      var room = rooms[key];
      room.playlistId = key;
      filtered.push(room);
    }

    return filtered;
  }, []);
  return realRooms;
}

function onGroupMessage(io, socket) {
  socket.on("group-message", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              io["in"](data.group).emit("group-message", {
                correspondent: data.correspondent,
                message: data.messageToSend
              });

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }());
}

function listActivePlaylists(io, socket) {
  socket.on("get-active-playlists", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
      var activePlaylists, activePlaylistIds, playlists;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              activePlaylists = getRooms(io.sockets.adapter.rooms).sort(function (_ref5, _ref6) {
                var a = _ref5.length;
                var b = _ref6.length;
                return b - a;
              });
              activePlaylistIds = activePlaylists.map(function (playlist) {
                return playlist.playlistId;
              });
              _context3.next = 4;
              return playlistService.findPlaylistsById(activePlaylistIds);

            case 4:
              playlists = _context3.sent;
              socket.emit("get-active-playlists", playlists);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }());
}

function handleGroups(socket) {
  socket.on("join-group", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(group, previousGroup) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              previousGroup && socket.leave(previousGroup);
              socket.join(group);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4, _x5) {
      return _ref7.apply(this, arguments);
    };
  }());
  socket.on("leave-group", function (group) {
    socket.leave(group);
  });
}

function initializeSocketServer(io) {
  io.on("connect", function (socket) {
    var token = getToken(socket);

    if (token) {
      _jsonwebtoken["default"].verify(getToken(socket), process.env.PASSPORT_SECRET, function (err, decoded) {
        clients[decoded._id] = socket;
        onMessage(socket, clients);
      });
    }

    handleGroups(socket);
    listActivePlaylists(io, socket);
    onGroupMessage(io, socket);
    onDisconnect(socket);
  });
}