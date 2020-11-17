"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _index = require("../services/index");

var _expressValidator = require("express-validator");

var _validators = require("../store/validators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config();

var authController = _express["default"].Router();

var authService = new _index.AuthService();
var userService = new _index.UserService();
authController.get("/", _passport["default"].authenticate("jwt", {
  session: false
}), function (req, res, next) {
  try {
    res.status(200).send(req.user);
  } catch (_unused) {
    next(error);
  }
});
authController.get("/verify-account/:userId/:code", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$params, userId, code, accountVerified;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$params = req.params, userId = _req$params.userId, code = _req$params.code;
            _context.next = 4;
            return authService.confirmAccountVerification(userId, code);

          case 4:
            accountVerified = _context.sent;
            return _context.abrupt("return", accountVerified ? res.status(200).json("Account has been verified") : res.status(403).send("Account Verification Failed"));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            next(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
authController.post("/register", _validators.registerValidation, /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var errorsAfterValidation, _req$body, email, password, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            errorsAfterValidation = (0, _expressValidator.validationResult)(req);

            if (errorsAfterValidation.isEmpty()) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(400).json(errorsAfterValidation.mapped()));

          case 3:
            _context2.prev = 3;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context2.next = 7;
            return authService.register(email, password);

          case 7:
            newUser = _context2.sent;
            return _context2.abrupt("return", newUser ? res.status(200).json("Verification link sent") : res.status(403).send("User exists already"));

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            next(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
authController.post("/login", _validators.loginValidation, /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var errorsAfterValidation, _req$body2, email, password, user, token;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            errorsAfterValidation = (0, _expressValidator.validationResult)(req);

            if (errorsAfterValidation.isEmpty()) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json(errorsAfterValidation.mapped()));

          case 3:
            _context3.prev = 3;
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            _context3.next = 7;
            return userService.findUserByEmail(email);

          case 7:
            user = _context3.sent;

            if (!(user && user.email)) {
              _context3.next = 15;
              break;
            }

            _context3.next = 11;
            return authService.authenticate(user, password);

          case 11:
            token = _context3.sent;

            if (token) {
              res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.ENV === "Prod" ? true : false
              });
              res.status(200).send(user);
            } else {
              res.status(403).send("Authentication failed");
            }

            _context3.next = 16;
            break;

          case 15:
            res.status(404).send("User not found");

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](3);
            next(_context3.t0);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 18]]);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
authController.post("/logout", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            try {
              res.clearCookie("token");
              res.send(204);
            } catch (error) {
              next(error);
            }

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = authController;
exports["default"] = _default;