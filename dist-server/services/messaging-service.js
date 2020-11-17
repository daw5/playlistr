"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../database/models/index");

var _index2 = require("./index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

require("dotenv").config();

var MessagingService = /*#__PURE__*/function () {
  function MessagingService() {
    _classCallCheck(this, MessagingService);

    this.userService = new _index2.UserService();
  }

  _createClass(MessagingService, [{
    key: "findConversationsByUser",
    value: function () {
      var _findConversationsByUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user_id) {
        var conversations;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _index.Conversation.find({
                  users: user_id
                }).populate({
                  path: "messages",
                  options: {
                    sort: {
                      _id: -1
                    },
                    limit: 30
                  }
                });

              case 2:
                conversations = _context.sent;
                return _context.abrupt("return", conversations);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function findConversationsByUser(_x) {
        return _findConversationsByUser.apply(this, arguments);
      }

      return findConversationsByUser;
    }()
  }, {
    key: "findConversation",
    value: function () {
      var _findConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(sender_id, reciever_id) {
        var conversation;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _index.Conversation.findOne({
                  users: {
                    $all: [sender_id, reciever_id]
                  }
                });

              case 2:
                conversation = _context2.sent;
                return _context2.abrupt("return", conversation);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findConversation(_x2, _x3) {
        return _findConversation.apply(this, arguments);
      }

      return findConversation;
    }()
  }, {
    key: "saveInteraction",
    value: function () {
      var _saveInteraction = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(token, data) {
        var reciever_id, contents, newConversation, conversation, message;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                reciever_id = data.reciever_id, contents = data.contents;
                newConversation = false;
                _context3.next = 4;
                return this.findConversation(token._id, reciever_id);

              case 4:
                conversation = _context3.sent;

                if (conversation) {
                  _context3.next = 10;
                  break;
                }

                newConversation = true;
                _context3.next = 9;
                return this.createConversation(token._id, reciever_id);

              case 9:
                conversation = _context3.sent;

              case 10:
                _context3.next = 12;
                return this.createMessage(token._id, reciever_id, contents, conversation._id);

              case 12:
                message = _context3.sent;
                this.addMessageToConversation(conversation._id, message._id);

                if (!newConversation) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 17;
                return _index.Conversation.findById(conversation._id).populate("messages");

              case 17:
                conversation = _context3.sent;

              case 18:
                return _context3.abrupt("return", {
                  message: message,
                  newConversation: newConversation ? conversation : null
                });

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function saveInteraction(_x4, _x5) {
        return _saveInteraction.apply(this, arguments);
      }

      return saveInteraction;
    }()
  }, {
    key: "createMessage",
    value: function () {
      var _createMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(sender_id, reciever_id, contents, conversation_id) {
        var message, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                message = new _index.Message({
                  sender: sender_id,
                  reciever: reciever_id,
                  contents: contents,
                  conversation: conversation_id
                });
                _context4.next = 3;
                return message.save();

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createMessage(_x6, _x7, _x8, _x9) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
  }, {
    key: "addMessageToConversation",
    value: function () {
      var _addMessageToConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(conversation_id, message_id) {
        var conversation;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _index.Conversation.findByIdAndUpdate(conversation_id, {
                  $push: {
                    messages: message_id
                  }
                });

              case 2:
                conversation = _context5.sent;
                return _context5.abrupt("return", conversation);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function addMessageToConversation(_x10, _x11) {
        return _addMessageToConversation.apply(this, arguments);
      }

      return addMessageToConversation;
    }()
  }, {
    key: "createConversation",
    value: function () {
      var _createConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(sender_id, reciever_id) {
        var conversation, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                conversation = new _index.Conversation({
                  users: [sender_id, reciever_id]
                });
                _context6.next = 3;
                return conversation.save();

              case 3:
                result = _context6.sent;
                return _context6.abrupt("return", result);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function createConversation(_x12, _x13) {
        return _createConversation.apply(this, arguments);
      }

      return createConversation;
    }()
  }, {
    key: "loadMessages",
    value: function () {
      var _loadMessages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(user, _ref) {
        var conversationId, messagesLoaded, conversation, messages;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                conversationId = _ref.conversationId, messagesLoaded = _ref.messagesLoaded;
                _context7.next = 3;
                return _index.Conversation.findOne({
                  _id: conversationId,
                  users: user._id
                });

              case 3:
                conversation = _context7.sent;

                if (!conversation) {
                  _context7.next = 9;
                  break;
                }

                _context7.next = 7;
                return _index.Message.find({
                  conversation: conversationId
                }).sort({
                  _id: -1
                }).skip(Number(messagesLoaded)).limit(30);

              case 7:
                messages = _context7.sent;
                return _context7.abrupt("return", messages);

              case 9:
                return _context7.abrupt("return", null);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function loadMessages(_x14, _x15) {
        return _loadMessages.apply(this, arguments);
      }

      return loadMessages;
    }()
  }]);

  return MessagingService;
}();

exports["default"] = MessagingService;