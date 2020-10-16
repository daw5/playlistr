import { MessagingService } from "../services/index";

const messagingService = new MessagingService();

export default function (socket) {
  socket.on("message", async function (data) {
    messagingService.saveMessage(socket.decoded_token, data);
    console.log(socket.decoded_token.email, data);
  });
}
