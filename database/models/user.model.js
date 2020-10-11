import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
