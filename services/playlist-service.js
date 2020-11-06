require("dotenv").config();

import { Playlist } from "../database/models/index";

export default class PlaylistService {
  async listPlaylists() {
    const playlists = await Playlist.find().select("-urls -__v");
    return playlists;
  }

  async listRecentPlaylists() {
    const playlists = await Playlist.find()
      .sort({ _id: -1 })
      .limit(1000)
      .select("-urls -__v");
    return playlists;
  }

  async findPlaylistById(_id) {
    const playlist = await Playlist.findById(_id);
    return playlist;
  }

  async createPlaylist(title, creator, urls) {
    const playlist = new Playlist({ title, creator, urls });
    try {
      const result = await playlist.save();
      return { status: 200, result };
    } catch (error) {
      return { status: 422, result: error };
    }
  }
}
