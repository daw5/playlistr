import express from "express";
import passport from "passport";
import { UserService } from "../services/index";

const userController = express.Router();
const userService = new UserService();

userController.get("/", async (req, res) => {
  const users = await userService.listUsers();
  console.log("users: ", users);
  res.status(200).send(users);
});

export default userController;
