import mongoose from "mongoose";
import { Schema } from "mongoose";

const playlistSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  urls: [
    {
      type: String,
      required: true,
    },
  ],
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

playlistSchema.index({ creator: 1, title: 1 }, { unique: true });

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
