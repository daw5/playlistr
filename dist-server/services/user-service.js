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

var argon2 = require("argon2");

var UserService = /*#__PURE__*/function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, [{
    key: "listUsers",
    value: function () {
      var _listUsers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _index.User.find().select("-password -status -__v");

              case 2:
                users = _context.sent;
                return _context.abrupt("return", users);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function listUsers() {
        return _listUsers.apply(this, arguments);
      }

      return listUsers;
    }()
  }, {
    key: "findUserById",
    value: function () {
      var _findUserById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_id) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _index.User.findById(_id);

              case 2:
                user = _context2.sent;
                return _context2.abrupt("return", user);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findUserById(_x) {
        return _findUserById.apply(this, arguments);
      }

      return findUserById;
    }()
  }, {
    key: "setUsername",
    value: function () {
      var _setUsername = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
        var _id, username, user;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = data._id, username = data.username;
                _context3.next = 3;
                return _index.User.findByIdAndUpdate(_id, {
                  username: username
                });

              case 3:
                _context3.next = 5;
                return _index.User.findById(_id);

              case 5:
                user = _context3.sent;
                return _context3.abrupt("return", user);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function setUsername(_x2) {
        return _setUsername.apply(this, arguments);
      }

      return setUsername;
    }()
  }, {
    key: "findSlimUserById",
    value: function () {
      var _findSlimUserById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_id) {
        var user;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _index.User.findById(_id).select("-password -status -__v");

              case 2:
                user = _context4.sent;
                return _context4.abrupt("return", user);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function findSlimUserById(_x3) {
        return _findSlimUserById.apply(this, arguments);
      }

      return findSlimUserById;
    }()
  }, {
    key: "findUserByEmail",
    value: function () {
      var _findUserByEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(email) {
        var user;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _index.User.findOne({
                  email: email
                });

              case 2:
                user = _context5.sent;
                return _context5.abrupt("return", user);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function findUserByEmail(_x4) {
        return _findUserByEmail.apply(this, arguments);
      }

      return findUserByEmail;
    }()
  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(email, password) {
        var hashedPassword, user, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return argon2.hash(password);

              case 2:
                hashedPassword = _context6.sent;
                user = new _index.User({
                  email: email,
                  password: hashedPassword
                });
                _context6.prev = 4;
                _context6.next = 7;
                return user.save();

              case 7:
                result = _context6.sent;
                return _context6.abrupt("return", result);

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6["catch"](4);
                return _context6.abrupt("return", _context6.t0);

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[4, 11]]);
      }));

      function createUser(_x5, _x6) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }]);

  return UserService;
}();

exports["default"] = UserService;