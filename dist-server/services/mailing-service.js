"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require("dotenv").config();

var mailgun = require("mailgun-js");

var MailingService = /*#__PURE__*/function () {
  function MailingService() {
    _classCallCheck(this, MailingService);

    this.DOMAIN = process.env.MAILGUN_DOMAIN;
  }

  _createClass(MailingService, [{
    key: "sendVerificationEmail",
    value: function sendVerificationEmail(userEmail, code, userId) {
      var verificationLink = "".concat(process.env.BASE_URL, "/api/auth/verify-account/").concat(userId, "/").concat(code);
      var mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: this.DOMAIN
      });
      var data = {
        from: "daw5@".concat(this.DOMAIN),
        to: userEmail,
        subject: "Email Verification",
        html: "<h1>Thank you for creating your account!</h1><p><a href=".concat(verificationLink, ">Click this link to verify your email</a></p>")
      };
      mg.messages().send(data, function (error, body) {
        if (error) {
          console.log("error: ", error);
        } else {
          console.log(body);
        }
      });
    }
  }]);

  return MailingService;
}();

exports["default"] = MailingService;