"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "authController", {
  enumerable: true,
  get: function get() {
    return _auth["default"];
  }
});
Object.defineProperty(exports, "mailingController", {
  enumerable: true,
  get: function get() {
    return _mailing["default"];
  }
});
Object.defineProperty(exports, "userController", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "playlistController", {
  enumerable: true,
  get: function get() {
    return _playlist["default"];
  }
});

var _auth = _interopRequireDefault(require("./auth.controller"));

var _mailing = _interopRequireDefault(require("./mailing.controller"));

var _user = _interopRequireDefault(require("./user.controller"));

var _playlist = _interopRequireDefault(require("./playlist.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }