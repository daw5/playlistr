import express from "express";
import passport from "passport";
import {
  UserService,
  MessagingService,
  PlaylistService,
} from "../services/index";

const userController = express.Router();
const userService = new UserService();
const messagingService = new MessagingService();
const playlistService = new PlaylistService();

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
      const user = await userService.findUserById(req.user._id);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
);

userController.get(
  "/current/playlists",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const playlists = await playlistService.findPlaylistsByUser(req.user._id);
      res.status(200).send(playlists);
    } catch (error) {
      next(error);
    }
  }
);

userController.get(
  "/current/conversations",
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

userController.get(
  "/current/conversations/:conversationId/load-messages/:messagesLoaded",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const messages = await messagingService.loadMessages(
        req.user,
        req.params
      );
      res.status(200).send(messages);
    } catch (error) {
      next(error);
    }
  }
);

export default userController;
