const mongoose = require("mongoose");
const connection =
  process.env.DB_CONNECTION_STRING ||
  `mongodb://localhost:27017/${process.env.DB_NAME}`;

const connectDb = () => {
  return mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = connectDb;
