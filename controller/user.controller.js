import express from "express";
import passport from "passport";
import { UserService, MessagingService } from "../services/index";

const userController = express.Router();
const userService = new UserService();
const messagingService = new MessagingService();

userController.get("/", async (req, res, next) => {
  try {
    const users = await userService.listUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userController.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      res.status(200).send(req.user);
    } catch (error) {
      next(error);
    }
  }
);

userController.get(
  "/conversations",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const conversations = await messagingService.findConversationsByUser(
        req.user._id
      );
      res.status(200).send(conversations);
    } catch (error) {
      next(error);
    }
  }
);

export default userController;
