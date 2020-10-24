require("dotenv").config();

import { Message, Conversation } from "../database/models/index";
import { UserService } from "./index";

export default class MessagingService {
  constructor() {
    this.userService = new UserService();
  }

  async saveInteraction(token, data) {
    const { reciever_id, contents } = data;
    const user = await this.userService.getUserByEmail(token.email);
    const conversation = await this.findConversation(user._id, reciever_id);
    const message = await this.createMessage(
      user._id,
      reciever_id,
      contents,
      conversation._id
    );
    return conversation && message;
  }

  async findConversation(sender_id, reciever_id) {
    let convo = Conversation.findOne({
      users: [sender_id, reciever_id],
    });
    if (convo === undefined) {
      convo = await this.createConversation(sender_id, reciever_id);
    }
    return convo;
  }

  async createMessage(sender_id, reciever_id, contents, conversation_id) {
    const message = new Message({
      sender_id,
      reciever_id,
      contents,
      conversation_id,
    });
    const result = await message.save();
    return result;
  }

  async createConversation(sender_id, reciever_id) {
    const conversation = new Conversation({
      users: [sender_id, reciever_id],
    });
    const result = await conversation.save();
    return result;
  }
}
