import { User } from "../database/models/index";
import { config } from "../store/config";
import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");

export default class UserService {
  async listUsers() {
    const users = await User.find().select("-password -status -__v");
    return users;
  }

  getUserData(user, email) {
    const token = jwt.sign({ email }, config.passport.secret, {
      expiresIn: 10000000,
    });
    const userToReturn = { ...user.toJSON(), ...{ token } };
    delete userToReturn.password;
    return userToReturn;
  }

  async createUser(email, password) {
    password = bcrypt.hashSync(password, 10);
    const user = new User({ email, password });
    const result = await user.save();
    return result;
  }
}
