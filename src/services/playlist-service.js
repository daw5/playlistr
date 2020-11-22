require("dotenv").config();

import { Playlist } from "../database/models/index";
const ObjectId = require("mongodb").ObjectID;

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
    const list = _ids.map((e) => ObjectId(e));
    let playlists = await Playlist.find({ _id: { $in: list } });
    playlists = list.map((e) => playlists.find((s) => s._id.equals(e)));
    return playlists;
  }

  async listRecentPlaylists(limit, withTracks) {
    const keysToOmit = withTracks ? "-__v" : "-tracks -__v";
    const playlists = await Playlist.find()
      .sort({ _id: -1 })
      .limit(limit)
      .select(keysToOmit);
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
