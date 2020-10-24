import mongoose from "mongoose";
import { Schema } from "mongoose";

const conversationSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
