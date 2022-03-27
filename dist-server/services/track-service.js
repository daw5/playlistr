"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require("dotenv").config();

var axios = require("axios")["default"];

var hostsInfo = {
  rumble: {
    embedRegex: /https:\/\/rumble.com\/embed\/[a-z0-9]*/,
    thumbnailRegex: /thumbnailUrl":"(.*\.jpg)"/
  },
  bitchute: {
    thumbnailRegex: /https:\/\/.*.bitchute.com\/live\/cover_images\/[a-zA-Z]*\/.*.jpg/
  },
  odysee: {
    thumbnailRegex: /"thumbnailUrl": "(https:\/\/cards.odysee.com\/[a-zA-Z0-9]*.jpg)"/,
    embedRegex: /"embedUrl": "(https:\/\/odysee.com\/\$\/embed\/[a-zA-Z0-9-]*\/[a-z0-9]*\?)"/
  },
  brandnewtube: {
    thumbnailRegex: /name="thumbnail" content="(https:\/\/.*\/upload\/photos\/2021\/12\/.*.jpe?g)"/,
    embedRegex: /src="(https:\/\/brandnewtube.com\/embed\/[a-zA-Z0-9]*)"/
  }
};

var TrackService = /*#__PURE__*/function () {
  function TrackService() {
    _classCallCheck(this, TrackService);
  }

  _createClass(TrackService, [{
    key: "getTrackDetails",
    value: function () {
      var _getTrackDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(host, shareUrl) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", axios.get(shareUrl).then(function (response) {
                  var embedRegex;
                  var thumbnailRegex;

                  switch (host) {
                    case "rumble":
                      embedRegex = hostsInfo.rumble.embedRegex;
                      thumbnailRegex = hostsInfo.rumble.thumbnailRegex;
                      return {
                        embedUrl: executeRegex(embedRegex, response.data)[0],
                        thumbnailUrl: executeRegex(thumbnailRegex, response.data)[1]
                      };

                    case "bitchute":
                      thumbnailRegex = hostsInfo.bitchute.thumbnailRegex;
                      return {
                        embedUrl: null,
                        thumbnailUrl: executeRegex(thumbnailRegex, response.data)[0]
                      };

                    case "odysee":
                      embedRegex = hostsInfo.odysee.embedRegex;
                      thumbnailRegex = hostsInfo.odysee.thumbnailRegex;
                      return {
                        embedUrl: executeRegex(embedRegex, response.data)[1],
                        thumbnailUrl: executeRegex(thumbnailRegex, response.data)[1]
                      };

                    case "brandnewtube":
                      embedRegex = hostsInfo.brandnewtube.embedRegex;
                      thumbnailRegex = hostsInfo.brandnewtube.thumbnailRegex; // TODO find out why thumbnail cannot always be fetched

                      var thumbnailRegexMatch = executeRegex(thumbnailRegex, response.data);
                      return {
                        embedUrl: executeRegex(embedRegex, response.data)[1],
                        thumbnailUrl: thumbnailRegexMatch ? thumbnailRegexMatch[1] : null
                      };
                  }

                  return {
                    embedUrl: null,
                    thumbnailUrl: null
                  };
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getTrackDetails(_x, _x2) {
        return _getTrackDetails.apply(this, arguments);
      }

      return getTrackDetails;
    }()
  }]);

  return TrackService;
}();

exports["default"] = TrackService;

function executeRegex(regex, data) {
  return regex.exec(data);
}