import { User } from "../database/models/index";
import { ExtractJwt } from "passport-jwt";
const socketioJwt = require("socketio-jwt");

export default function (socket) {
  socket.on("message", async function (data) {
    // const jwt = ExtractJwt.fromBodyField("jwt");
    // // const user = await User.findOne({ email: "anarchonist@protonmail.com" });
    // // console.log("user: ", user, data);
    // console.log("jwt: ", jwt);
  });
}
