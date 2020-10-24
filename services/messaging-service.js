require("dotenv").config();

import { Message, Conversation } from "../database/models/index";
import { UserService } from "./index";

export default class MessagingService {
  constructor() {
    this.userService = new UserService();
  }

  async findConversationsByUser(user_id) {
    const conversations = await Conversation.find({ users: user_id });
    console.log("messaging service conversations: ", conversations);
    return conversations;
  }

  async findConversation(sender_id, reciever_id, message_id) {
    let conversation = await Conversation.findOne({
      users: [sender_id, reciever_id],
    });
    if (!conversation) {
      conversation = await this.createConversation(
        sender_id,
        reciever_id,
        message_id
      );
    }
    return conversation;
  }

  async saveInteraction(token, data) {
    const { reciever_id, contents } = data;
    const user = await this.userService.findUserByEmail(token.email);
    const message = await this.createMessage(user._id, reciever_id, contents);
    const conversation = await this.findConversation(
      user._id,
      reciever_id,
      message
    );
    return conversation && message;
  }

  async createMessage(sender_id, reciever_id, contents) {
    const message = new Message({
      sender: sender_id,
      reciever: reciever_id,
      contents,
    });
    const result = await message.save();
    return result;
  }

  async createConversation(sender_id, reciever_id, message_id) {
    const conversation = new Conversation({
      users: [sender_id, reciever_id],
      messages: [message_id],
    });
    console.log("conversation: ", conversation);
    const result = await conversation.save();
    return result;
  }
}
