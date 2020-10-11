require("dotenv").config();
import { applyPassportStrategy } from "./store/passport";
import { userController } from "./controller";
import bodyParser from "body-parser";
import passport from "passport";
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const connectDb = require("./database/connection");

applyPassportStrategy(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", userController);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("Mongo connected");
  });
});
