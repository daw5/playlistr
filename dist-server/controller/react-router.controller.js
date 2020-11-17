"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reactRouterController = _express["default"].Router();

reactRouterController.get("*", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "../../client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
var _default = reactRouterController;
exports["default"] = _default;