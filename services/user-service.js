import { User } from "../database/models/index";
import { config } from "../store/config";
import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");

export default class UserService {
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
