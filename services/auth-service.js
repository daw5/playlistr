import { EmailVerification } from "../database/models/index";
import { UserService, MailingService } from "./index";

const randomKeyGenerator = require("random-key");
const argon2 = require("argon2");

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

  async confirmAccountVerification(userId, code) {
    const user = await this.userService.getUserById(userId);
    const emailVerificationInstance = await EmailVerification.findOne({
      email: user.email,
    });
    if (emailVerificationInstance.code === code) {
      user.status = "active";
      const result = await user.save();
      return result;
    } else {
      return false;
    }
  }

  async register(email, password) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      await this.userService.createUser(email, password);
      const newUser = await this.userService.getUserByEmail(email);
      const code = randomKeyGenerator.generate();
      this.mailingService.sendVerificationEmail(email, code, newUser._id);
      await this.createEmailVerificationInstance(email, code);
      return this.userService.getUserByEmail(email);
    } else {
      return null;
    }
  }

  async authenticate(user, password) {
    const isPasswordMatched = await argon2.verify(user.password, password);
    if (isPasswordMatched && user.status === "active") {
      return this.userService.getToken(user);
    } else {
      return null;
    }
  }
}
