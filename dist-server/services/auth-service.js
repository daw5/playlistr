"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../database/models/index");

var _index2 = require("./index");

var _config = require("../store/config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var randomKeyGenerator = require("random-key");

var argon2 = require("argon2");

var AuthService = /*#__PURE__*/function () {
  function AuthService() {
    _classCallCheck(this, AuthService);

    this.userService = new _index2.UserService();
    this.mailingService = new _index2.MailingService();
  }

  _createClass(AuthService, [{
    key: "getToken",
    value: function getToken(user) {
      var token = _jsonwebtoken["default"].sign({
        _id: user._id,
        email: user.email,
        username: user.username
      }, _config.config.passport.secret, {
        expiresIn: 10000000
      });

      return token;
    }
  }, {
    key: "createEmailVerificationInstance",
    value: function () {
      var _createEmailVerificationInstance = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, code) {
        var emailVerificationInstance, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                emailVerificationInstance = new _index.EmailVerification({
                  email: email,
                  code: code
                });
                _context.next = 3;
                return emailVerificationInstance.save();

              case 3:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createEmailVerificationInstance(_x, _x2) {
        return _createEmailVerificationInstance.apply(this, arguments);
      }

      return createEmailVerificationInstance;
    }()
  }, {
    key: "confirmAccountVerification",
    value: function () {
      var _confirmAccountVerification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(userId, code) {
        var user, emailVerificationInstance, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.userService.findUserById(userId);

              case 2:
                user = _context2.sent;
                _context2.next = 5;
                return _index.EmailVerification.findOne({
                  email: user.email
                });

              case 5:
                emailVerificationInstance = _context2.sent;

                if (!(emailVerificationInstance.code === code)) {
                  _context2.next = 14;
                  break;
                }

                user.status = "active";
                _context2.next = 10;
                return user.save();

              case 10:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 14:
                return _context2.abrupt("return", false);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function confirmAccountVerification(_x3, _x4) {
        return _confirmAccountVerification.apply(this, arguments);
      }

      return confirmAccountVerification;
    }()
  }, {
    key: "register",
    value: function () {
      var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(email, password) {
        var user, newUser, code;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.userService.findUserByEmail(email);

              case 2:
                user = _context3.sent;

                if (user) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 6;
                return this.userService.createUser(email, password);

              case 6:
                _context3.next = 8;
                return this.userService.findUserByEmail(email);

              case 8:
                newUser = _context3.sent;

                if (!newUser) {
                  _context3.next = 15;
                  break;
                }

                code = randomKeyGenerator.generate();
                this.mailingService.sendVerificationEmail(email, code, newUser._id);
                _context3.next = 14;
                return this.createEmailVerificationInstance(email, code);

              case 14:
                return _context3.abrupt("return", this.userService.findUserByEmail(email));

              case 15:
                _context3.next = 18;
                break;

              case 17:
                return _context3.abrupt("return", null);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function register(_x5, _x6) {
        return _register.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: "authenticate",
    value: function () {
      var _authenticate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user, password) {
        var isPasswordMatched;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return argon2.verify(user.password, password);

              case 2:
                isPasswordMatched = _context4.sent;

                if (!(isPasswordMatched && user.status === "active")) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", this.getToken(user));

              case 7:
                return _context4.abrupt("return", null);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function authenticate(_x7, _x8) {
        return _authenticate.apply(this, arguments);
      }

      return authenticate;
    }()
  }]);

  return AuthService;
}();

exports["default"] = AuthService;