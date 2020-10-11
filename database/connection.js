const mongoose = require("mongoose");
const connection = `mongodb://localhost:27017/${process.env.DB_NAME}`;

const connectDb = () => {
  return mongoose.connect(connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDb;
