import { Message, Conversation } from "../database/models/index";
import { UserService } from "./index";

require("dotenv").config();

export default class MessagingService {
  constructor() {
    this.userService = new UserService();
  }

  async findConversationsByUser(user_id) {
    const conversations = await Conversation.find({ users: user_id }).populate(
      "messages"
    );
    return conversations;
  }

  async findConversation(sender_id, reciever_id) {
    const conversation = await Conversation.findOne({
      users: [sender_id, reciever_id],
    });
    return conversation;
  }

  async saveInteraction(token, data) {
    const { reciever_id, contents } = data;
    const user = await this.userService.findUserByEmail(token.email);
    let conversation = await this.findConversation(user._id, reciever_id);
    if (!conversation) {
      conversation = await this.createConversation(
        sender_id,
        reciever_id,
        message_id
      );
    }
    const message = await this.createMessage(
      user._id,
      reciever_id,
      contents,
      conversation._id
    );
    return conversation && message;
  }

  async createMessage(sender_id, reciever_id, contents, conversation_id) {
    const message = new Message({
      sender: sender_id,
      reciever: reciever_id,
      contents,
    });
    await this.addMessageToConversation(conversation_id, message._id);
    const result = await message.save();

    return result;
  }

  async addMessageToConversation(conversation_id, message_id) {
    const conversation = Conversation.findOneAndUpdate(
      { _id: conversation_id },
      { $push: { messages: message_id } }
    );
    return conversation;
  }

  async createConversation(sender_id, reciever_id, message_id) {
    const conversation = new Conversation({
      users: [sender_id, reciever_id],
      messages: [message_id],
    });
    const result = await conversation.save();
    return result;
  }
}
