require("dotenv").config();
import { applyPassportStrategy } from "./store/passport";
import { authController, mailingController } from "./controller";
import bodyParser from "body-parser";
import passport from "passport";

const PORT = process.env.PORT;
const express = require("express");
const app = express();
const connectDb = require("./database/connection");

applyPassportStrategy(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/auth", authController);
app.use("/mailing", mailingController);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("Mongo connected");
  });
});
