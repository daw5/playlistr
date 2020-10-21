import express from "express";
import { UserService } from "../services/index";

const userController = express.Router();
const userService = new UserService();

userController.get("/", async (req, res) => {
  const users = await userService.listUsers();
  res.status(200).send(users);
});

export default userController;
