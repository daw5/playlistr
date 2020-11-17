import { User } from "../database/models/index";

const argon2 = require("argon2");

export default class UserService {
  async listUsers() {
    const users = await User.find().select("-password -status -__v");
    return users;
  }

  async findUserById(_id) {
    const user = await User.findById(_id);
    return user;
  }

  async setUsername(data) {
    const { _id, username } = data;
    await User.findByIdAndUpdate(_id, { username });
    const user = await User.findById(_id);
    return user;
  }

  async findSlimUserById(_id) {
    const user = await User.findById(_id).select("-password -status -__v");
    return user;
  }

  async findUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async createUser(email, password) {
    const hashedPassword = await argon2.hash(password);
    const user = new User({ email, password: hashedPassword });
    try {
      const result = await user.save();
      return result;
    } catch (error) {
      return error;
    }
  }
}
