"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginValidation = exports.registerValidation = void 0;

var _expressValidator = require("express-validator");

var _constant = require("./constant");

// ================================
// Validation:
// Handle all validation check for the server
// ================================
var registerValidation = [(0, _expressValidator.check)("email").exists().withMessage(_constant.EMAIL_IS_EMPTY).isEmail().withMessage(_constant.EMAIL_IS_IN_WRONG_FORMAT), (0, _expressValidator.check)("password").exists().withMessage(_constant.PASSWORD_IS_EMPTY).isLength({
  min: 8
}).withMessage(_constant.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8)];
exports.registerValidation = registerValidation;
var loginValidation = [(0, _expressValidator.check)("email").exists().withMessage(_constant.EMAIL_IS_EMPTY).isEmail().withMessage(_constant.EMAIL_IS_IN_WRONG_FORMAT), (0, _expressValidator.check)("password").exists().withMessage(_constant.PASSWORD_IS_EMPTY).isLength({
  min: 8
}).withMessage(_constant.PASSWORD_LENGTH_MUST_BE_MORE_THAN_8)];
exports.loginValidation = loginValidation;