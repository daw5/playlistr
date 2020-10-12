import { User, EmailVerification } from "../database/models/index";
import { UserService, MailingService } from "./index";

const randomKeyGenerator = require("random-key");
const bcrypt = require("bcrypt");

export default class AuthService {
  constructor() {
    this.userService = new UserService();
    this.mailingService = new MailingService();
  }

  async createEmailVerificationInstance(email, code) {
    const emailVerificationInstance = new EmailVerification({
      email,
      code,
    });
    const result = await emailVerificationInstance.save();
    return result;
  }

  async verifyAccount(userId, code) {
    const user = await User.findOne({ _id: userId });
    const emailVerificationInstance = await EmailVerification.findOne({
      email: user.email,
    });
    if (emailVerificationInstance.code === code) {
      user.status = "active";
      user.save();
      return true;
    } else {
      return false;
    }
  }

  async register(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      await this.userService.createUser(email, password);
      const newUser = await User.findOne({ email });
      const code = randomKeyGenerator.generate();
      await this.createEmailVerificationInstance(email, code);
      this.mailingService.sendVerificationEmail(email, code, newUser._id);
      return this.userService.getUserData(newUser, email);
    } else {
      return null;
    }
  }

  async authenticate(user, password) {
    const isPasswordMatched = bcrypt.compareSync(password, user.password);
    if (isPasswordMatched && user.status === "active") {
      return this.userService.getUserData(user, user.email);
    } else {
      return null;
    }
  }
}
