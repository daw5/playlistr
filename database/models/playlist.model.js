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
  tracks: [
    {
      url: {
        type: String,
        required: true,
      },
      thumbnailUrl: {
        type: String,
        required: false,
      },
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
