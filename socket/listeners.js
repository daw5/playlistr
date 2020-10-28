import { MessagingService } from "../services/index";

const messagingService = new MessagingService();

export default function (socket, clients) {
  socket.on("message", async function (data) {
    const message = await messagingService.saveInteraction(
      socket.decoded_token,
      data
    );
    if (clients[data.reciever_id]) {
      // send sender id with this message (correspondent)
      clients[data.reciever_id].send({
        correspondent: data.sender_id,
        message,
      });
    }
    // send reciever id with this message (correspondent)
    socket.send({ correspondent: data.reciever_id, message });
  });
}
