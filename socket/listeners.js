import { MessagingService } from "../services/index";

const messagingService = new MessagingService();

export default function (socket, clients) {
  socket.on("message", async function (data) {
    await messagingService.saveInteraction(socket.decoded_token, data);
    clients[data.reciever_id].send(data);
  });
}
