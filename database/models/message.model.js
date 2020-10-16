import mongoose from "mongoose";
import { Schema } from "mongoose";

const messageSchema = new Schema({
  sender_id: {
    type: String,
    required: true,
  },
  reciever_id: {
    type: String,
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
