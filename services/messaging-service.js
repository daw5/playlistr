require("dotenv").config();
import { Message, User } from "../database/models/index";

export default class MessagingService {
  constructor() {}

  async saveMessage(token, data) {
    console.log("in the service");
    const { reciever_id, contents } = data;
    const user = await User.findOne({ email: token.email });
    console.log("user id: ", user._id, reciever_id, contents);
    const message = new Message({ sender_id: user._id, reciever_id, contents });
    const result = await message.save();
    // console.log("did it save: ", result);
    return result;
  }
}
