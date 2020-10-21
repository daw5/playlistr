require("dotenv").config();

import { Message } from "../database/models/index";
import { UserService } from "./index";

export default class MessagingService {
  constructor() {
    this.userService = new UserService();
  }

  async saveMessage(token, data) {
    const { reciever_id, contents } = data;
    const user = await this.userService.getUserByEmail(token.email);
    const message = new Message({ sender_id: user._id, reciever_id, contents });
    const result = await message.save();
    return result;
  }
}
