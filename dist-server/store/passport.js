"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyPassportStrategy = void 0;

var _passportJwt = require("passport-jwt");

var _config = require("./config");

var _models = require("../database/models");

/* eslint-disable import/prefer-default-export */
var applyPassportStrategy = function applyPassportStrategy(passport) {
  var options = {
    jwtFromRequest: function jwtFromRequest(req) {
      return req.cookies.token;
    },
    secretOrKey: _config.config.passport.secret
  };
  passport.use(new _passportJwt.Strategy(options, function (payload, done) {
    _models.User.findOne({
      email: payload.email
    }, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, {
          email: user.email,
          _id: user._id
        });
      }

      return done(null, false);
    });
  }));
};

exports.applyPassportStrategy = applyPassportStrategy;