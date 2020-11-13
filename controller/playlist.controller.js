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

playlistController.get("/recent", async (req, res, next) => {
  try {
    const playlists = await playlistService.listRecentPlaylists();
    res.status(200).send(playlists);
  } catch (error) {
    next(error);
  }
});

playlistController.get("/active", async (req, res, next) => {
  try {
    const playlists = await playlistService.findPlaylistsById(req.body);
    res.status(200).send(playlists);
  } catch (error) {
    next(error);
  }
});

playlistController.get("/:id", async (req, res, next) => {
  try {
    const playlist = await playlistService.findPlaylistById(req.params.id);
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
        req.body.tracks
      );
      res.status(playlist.status).send(playlist.result);
    } catch (error) {
      next(error);
    }
  }
);

playlistController.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let playlist = await playlistService.findPlaylistById(req.params.id);
      if (playlist.creator.equals(req.user._id)) {
        playlist = await playlistService.updatePlaylist(
          req.params.id,
          req.body
        );
        res.status(200).send(playlist);
      } else {
        res.status(403).send("Hey why don't you mind your own business?");
      }
    } catch (error) {
      next(error);
    }
  }
);

playlistController.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      let playlist = await playlistService.findPlaylistById(req.params.id);
      if (playlist.creator.equals(req.user._id)) {
        console.log("what the fuck explain");
        playlist = await playlistService.deletePlaylist(
          req.params.id,
          req.body
        );
        res.status(200).send(playlist);
      } else {
        res
          .status(403)
          .send(
            "Trying to delete someone else's playlist eh? Lowest of the low."
          );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default playlistController;
