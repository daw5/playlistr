"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../database/models/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require("dotenv").config();

var ObjectId = require("mongodb").ObjectID;

var PlaylistService = /*#__PURE__*/function () {
  function PlaylistService() {
    _classCallCheck(this, PlaylistService);
  }

  _createClass(PlaylistService, [{
    key: "listPlaylists",
    value: function () {
      var _listPlaylists = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var playlists;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _index.Playlist.find().select("-tracks -__v");

              case 2:
                playlists = _context.sent;
                return _context.abrupt("return", playlists);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function listPlaylists() {
        return _listPlaylists.apply(this, arguments);
      }

      return listPlaylists;
    }()
  }, {
    key: "findPlaylistsByUser",
    value: function () {
      var _findPlaylistsByUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user_id) {
        var playlists;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _index.Playlist.find({
                  creator: user_id
                });

              case 2:
                playlists = _context2.sent;
                return _context2.abrupt("return", playlists);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findPlaylistsByUser(_x) {
        return _findPlaylistsByUser.apply(this, arguments);
      }

      return findPlaylistsByUser;
    }()
  }, {
    key: "findPlaylistsById",
    value: function () {
      var _findPlaylistsById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ids) {
        var list, playlists;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                list = _ids.map(function (e) {
                  return ObjectId(e);
                });
                _context3.next = 3;
                return _index.Playlist.find({
                  _id: {
                    $in: list
                  }
                });

              case 3:
                playlists = _context3.sent;
                playlists = list.map(function (e) {
                  return playlists.find(function (s) {
                    return s._id.equals(e);
                  });
                });
                return _context3.abrupt("return", playlists);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function findPlaylistsById(_x2) {
        return _findPlaylistsById.apply(this, arguments);
      }

      return findPlaylistsById;
    }()
  }, {
    key: "listRecentPlaylists",
    value: function () {
      var _listRecentPlaylists = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var playlists;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _index.Playlist.find().sort({
                  _id: -1
                }).limit(1000).select("-tracks -__v");

              case 2:
                playlists = _context4.sent;
                return _context4.abrupt("return", playlists);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function listRecentPlaylists() {
        return _listRecentPlaylists.apply(this, arguments);
      }

      return listRecentPlaylists;
    }()
  }, {
    key: "findPlaylistById",
    value: function () {
      var _findPlaylistById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(_id) {
        var playlist;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _index.Playlist.findById(_id);

              case 2:
                playlist = _context5.sent;
                return _context5.abrupt("return", playlist);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function findPlaylistById(_x3) {
        return _findPlaylistById.apply(this, arguments);
      }

      return findPlaylistById;
    }()
  }, {
    key: "updatePlaylist",
    value: function () {
      var _updatePlaylist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(_id, playlistUpdates) {
        var playlist;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return _index.Playlist.findByIdAndUpdate(_id, playlistUpdates);

              case 2:
                playlist = _context6.sent;
                return _context6.abrupt("return", playlist);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function updatePlaylist(_x4, _x5) {
        return _updatePlaylist.apply(this, arguments);
      }

      return updatePlaylist;
    }()
  }, {
    key: "deletePlaylist",
    value: function () {
      var _deletePlaylist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(_id) {
        var result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _index.Playlist.findByIdAndDelete(_id);

              case 2:
                result = _context7.sent;
                return _context7.abrupt("return", result);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function deletePlaylist(_x6) {
        return _deletePlaylist.apply(this, arguments);
      }

      return deletePlaylist;
    }()
  }, {
    key: "createPlaylist",
    value: function () {
      var _createPlaylist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(title, creator, tracks) {
        var playlist, result;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                playlist = new _index.Playlist({
                  title: title,
                  creator: creator,
                  tracks: tracks
                });
                _context8.prev = 1;
                _context8.next = 4;
                return playlist.save();

              case 4:
                result = _context8.sent;
                return _context8.abrupt("return", {
                  status: 200,
                  result: result
                });

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8["catch"](1);
                return _context8.abrupt("return", {
                  status: 422,
                  result: _context8.t0
                });

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[1, 8]]);
      }));

      function createPlaylist(_x7, _x8, _x9) {
        return _createPlaylist.apply(this, arguments);
      }

      return createPlaylist;
    }()
  }]);

  return PlaylistService;
}();

exports["default"] = PlaylistService;