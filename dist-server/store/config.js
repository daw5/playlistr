"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

require("dotenv").config();

var config = {
  passport: {
    secret: process.env.PASSPORT_SECRET,
    expiresIn: 10000
  }
};
exports.config = config;