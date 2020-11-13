require("dotenv").config();

import { Playlist } from "../database/models/index";

export default class PlaylistService {
  async listPlaylists() {
    const playlists = await Playlist.find().select("-tracks -__v");
    return playlists;
  }

  async findPlaylistsByUser(user_id) {
    const playlists = await Playlist.find({ creator: user_id });
    return playlists;
  }

  async findPlaylistsById(_ids) {
    const playlists = await Playlist.find({ _id: _ids });
    return playlists;
  }

  async listRecentPlaylists() {
    const playlists = await Playlist.find()
      .sort({ _id: -1 })
      .limit(1000)
      .select("-tracks -__v");
    return playlists;
  }

  async findPlaylistById(_id) {
    const playlist = await Playlist.findById(_id);
    return playlist;
  }

  async updatePlaylist(_id, playlistUpdates) {
    const playlist = await Playlist.findByIdAndUpdate(_id, playlistUpdates);
    return playlist;
  }

  async deletePlaylist(_id) {
    const result = await Playlist.findByIdAndDelete(_id);
    return result;
  }

  async createPlaylist(title, creator, tracks) {
    const playlist = new Playlist({ title, creator, tracks });
    try {
      const result = await playlist.save();
      return { status: 200, result };
    } catch (error) {
      return { status: 422, result: error };
    }
  }
}
