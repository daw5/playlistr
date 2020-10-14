import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
  sender_id: {
    type: Number,
    required: true,
  },
  reciever_id: {
    type: Number,
    required: true,
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
