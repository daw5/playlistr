import { Message, Conversation } from "../database/models/index";
import { UserService } from "./index";

require("dotenv").config();

export default class MessagingService {
  constructor() {
    this.userService = new UserService();
  }

  async findConversationsByUserWithMessages(user_id) {
    const conversations = await Conversation.find({ users: user_id }).populate({
      path: "messages",
      options: {
        sort: { _id: -1 },
        limit: 30,
      },
    });
    return conversations;
  }

  async findConversationByPlaylistWithMessages(_id) {
    const conversation = await Conversation.findOne({
      users: _id,
    }).populate({
      path: "messages",
      options: {
        sort: { _id: -1 },
        limit: 30,
      },
      populate: {
        path: "sender",
      },
    });

    return conversation;
  }

  async findConversation(sender_id, reciever_id, playlist_id) {
    const conversation = await Conversation.findOne({
      users: {
        $all: playlist_id ? [playlist_id] : [sender_id, reciever_id],
      },
    });
    return conversation;
  }

  async saveInteraction(token, data) {
    const { reciever_id, contents, playlist_id } = data;

    let newConversation = false;
    let conversation = await this.findConversation(
      token._id,
      reciever_id,
      playlist_id
    );

    if (!conversation) {
      newConversation = true;
      conversation = await this.createConversation(
        token._id,
        reciever_id,
        playlist_id
      );
    }
    const message = await this.createMessage(
      token._id,
      playlist_id ? playlist_id : reciever_id,
      contents,
      conversation._id
    );

    await this.addMessageToConversation(conversation._id, message._id);

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

  async createConversation(sender_id, reciever_id, playlist_id) {
    const conversation = new Conversation({
      users: playlist_id ? [playlist_id] : [sender_id, reciever_id],
    });
    const result = await conversation.save();
    return result;
  }

  async loadMessages(user_id, conversationId, messagesLoaded, populateNames) {
    const conversation = await Conversation.findOne({
      _id: conversationId,
      users: user_id,
    });
    if (conversation) {
      const messages = this.messagesQuery(
        conversationId,
        messagesLoaded,
        populateNames
      );

      return messages;
    }
    return null;
  }

  async messagesQuery(conversationId, messagesLoaded, populateNames) {
    const messages = populateNames
      ? await Message.find({ conversation: conversationId })
          .populate("sender")
          .sort({ _id: -1 })
          .skip(Number(messagesLoaded))
          .limit(30)
      : await Message.find({ conversation: conversationId })
          .sort({ _id: -1 })
          .skip(Number(messagesLoaded))
          .limit(30);
    return messages;
  }
}
