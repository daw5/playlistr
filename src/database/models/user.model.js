import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    index: {
      unique: true,
      partialFilterExpression: { username: { $type: "string" } },
    },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
