"use strict";

var mongoose = require("mongoose");

var connection = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/".concat(process.env.DB_NAME);

var connectDb = function connectDb() {
  return mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
};

module.exports = connectDb;