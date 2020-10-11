import { User } from "../database/models/index";
import { config } from "../store/config";
import jwt from "jsonwebtoken";

const bcrypt = require("bcrypt");

export default class UserService {
  comparePassword = function comparePassword(password, savedPassword) {
    return bcrypt.compareSync(password, savedPassword);
  };

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

  async Register(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      await this.createUser(email, password);
      const newUser = await User.findOne({ email });
      return this.getUserData(newUser, email);
    } else {
      return null;
    }
  }

  async Authenticate(user, password) {
    const isPasswordMatched = this.comparePassword(password, user.password);
    if (isPasswordMatched) {
      return this.getUserData(user, user.email);
    } else {
      return null;
    }
  }
}
