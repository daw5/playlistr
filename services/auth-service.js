import { User } from "../database/models/index";
import { UserService } from "./index";

const bcrypt = require("bcrypt");

export default class AuthService {
  constructor() {
    this.userService = new UserService();
  }
  comparePassword = function comparePassword(password, savedPassword) {
    return bcrypt.compareSync(password, savedPassword);
  };

  async Register(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      await this.userService.createUser(email, password);
      const newUser = await User.findOne({ email });
      return this.userService.getUserData(newUser, email);
    } else {
      return null;
    }
  }

  async Authenticate(user, password) {
    const isPasswordMatched = this.comparePassword(password, user.password);
    if (isPasswordMatched) {
      return this.userService.getUserData(user, user.email);
    } else {
      return null;
    }
  }
}
