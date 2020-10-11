import { Schema } from "mongoose";

const bcrypt = require("bcrypt");

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
