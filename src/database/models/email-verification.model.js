import mongoose from "mongoose";
import { Schema } from "mongoose";

const emailVerificationCodeSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

const EmailVerificationCode = mongoose.model(
  "EmailVerificationCode",
  emailVerificationCodeSchema
);

export default EmailVerificationCode;
