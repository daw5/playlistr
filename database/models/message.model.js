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
