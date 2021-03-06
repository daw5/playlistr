import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reciever: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  contents: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
