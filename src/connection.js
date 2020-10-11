const mongoose = require("mongoose");
const User = require("../database/models/user.model");

const connection = "mongodb://localhost:27017/mongo-test";

const connectDb = () => {
  return mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
