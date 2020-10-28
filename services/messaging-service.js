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
    // console.log("conversations: ", conversations[0].messages);
    return conversations;
  }

  async findConversation(sender_id, reciever_id) {
    const conversation = await Conversation.findOne({
      users: sender_id || reciever_id,
    });
    return conversation;
  }

  async saveInteraction(token, data) {
    const { reciever_id, contents } = data;
    let newConversation = false;
    let conversation = await this.findConversation(token._id, reciever_id);
    if (!conversation) {
      newConversation = true;
      conversation = await this.createConversation(token._id, reciever_id);
    }
    const message = await this.createMessage(
      token._id,
      reciever_id,
      contents,
      conversation._id
    );
    this.addMessageToConversation(conversation._id, message._id);
    if (newConversation) {
      conversation = await Conversation.findById(conversation._id).populate(
        "messages"
      );
    }
    return { message, newConversation: newConversation ? conversation : null };
  }

  async createMessage(sender_id, reciever_id, contents, conversation_id) {
    const message = new Message({
      sender: sender_id,
      reciever: reciever_id,
      contents,
      conversation: conversation_id,
    });
    const result = await message.save();

    return result;
  }

  async addMessageToConversation(conversation_id, message_id) {
    const conversation = await Conversation.findByIdAndUpdate(conversation_id, {
      $push: { messages: message_id },
    });
    return conversation;
  }

  async createConversation(sender_id, reciever_id) {
    const conversation = new Conversation({
      users: [sender_id, reciever_id],
    });
    const result = await conversation.save();
    return result;
  }
}
