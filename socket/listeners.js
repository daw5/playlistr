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

  // listener for joining room, make sure to leave old room if socket.room
  // room can be room + playlistId
  // payload should include room, add room to socket.room

  // listener for room message
  // emit to socket.room which should be set from when they joined room
}
