import { User } from "../database/models/index";
import { config } from "../store/config";
import jwt from "jsonwebtoken";

const argon2 = require("argon2");

export default class UserService {
  async listUsers() {
    const users = await User.find().select("-password -status -__v");
    return users;
  }

  async getUserById(_id) {
    const user = await User.findOne({ _id });
    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
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
    const hashedPassword = await argon2.hash(password);
    const user = new User({ email, password: hashedPassword });
    const result = await user.save();
    return result;
  }
}
