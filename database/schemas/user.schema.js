import { Schema } from "mongoose";
import sha256 from "sha256";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
});

/**
 * @param {*} password
 */
userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

export default userSchema;
