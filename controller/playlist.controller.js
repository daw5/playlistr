import express from "express";
import passport from "passport";
import { PlaylistService } from "../services/index";

const playlistController = express.Router();
const playlistService = new PlaylistService();

playlistController.get("/", async (req, res, next) => {
  try {
    const playlists = await playlistService.listPlaylists();
    res.status(200).send(playlists);
  } catch (error) {
    next(error);
  }
});

playlistController.get("/:id", async (req, res, next) => {
  try {
    const playlist = await playlistService.findPlaylistById(req.playlistId);
    res.status(200).send(playlist);
  } catch (error) {
    next(error);
  }
});

playlistController.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const playlist = await playlistService.createPlaylist(
        req.body.title,
        req.user._id,
        req.body.urls
      );
      res.status(playlist.status).send(playlist.result);
    } catch (error) {
      next(error);
    }
  }
);

export default playlistController;
