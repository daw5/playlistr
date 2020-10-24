import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
  sender_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reciever_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  conversation_id: {
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
    expires: 600,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
