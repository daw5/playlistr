import { User } from "../database/models/index";
import jwt from "jsonwebtoken";
import { config } from "../store/config";
const bcrypt = require("bcrypt");

export default class UserService {
  constructor() {}

  async createUser(email, password) {
    password = bcrypt.hashSync(password, 10);
    const user = new User({ email, password });
    const result = await user.save();
    return result;
  }

  getUserData(user, email) {
    const token = jwt.sign({ email }, config.passport.secret, {
      expiresIn: 10000000,
    });
    const userToReturn = { ...user.toJSON(), ...{ token } };
    delete userToReturn.password;
    return userToReturn;
  }

  async Register(email, password) {
    console.log("email: ", email);
    const user = await User.findOne({ email });
    if (!user) {
      await this.createUser(email, password);
      const newUser = await User.findOne({ email });
      return this.getUserData(newUser, email);
    } else {
      return null;
    }
  }
}
