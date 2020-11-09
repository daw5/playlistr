import { MessagingService } from "../services/index";

const messagingService = new MessagingService();

export default function (socket, clients) {
  socket.on("message", async function (data) {
    const { message, newConversation } = await messagingService.saveInteraction(
      socket.decoded_token,
      data
    );
    if (clients[data.reciever_id]) {
      clients[data.reciever_id].send({
        correspondent: socket.decoded_token._id,
        message,
        newConversation,
      });
    }
    socket.send({
      correspondent: data.reciever_id,
      message,
      newConversation,
    });
  });
}
