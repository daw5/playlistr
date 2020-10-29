import io from "socket.io-client";

const socket = io.connect("http://localhost:4001");

export default class MessagingService {
  authenticateSocket(setLatestMessage) {
    socket.on("connect", function () {
      socket
        .emit("authenticate")
        .on("authenticated", () => {
          socket.on("message", function (data) {
            setLatestMessage(data);
          });
        })
        .on("unauthorized", (msg) => {
          console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
        });
    });
  }

  sendPrivateMessage = (evt, messageToSend, correspondent_id) => {
    if (evt.key === "Enter" || evt.type === "click") {
      evt.preventDefault();
      this.sendMessage(correspondent_id, messageToSend);
      return true;
    }
  };

  sendMessage(reciever_id, contents) {
    socket.emit("message", { reciever_id, contents });
  }

  getUsersRelevantToConversation(users, conversation) {
    const relevantUsers = {};
    conversation.users.forEach((user) => {
      relevantUsers[user] = users[user];
    });
    return relevantUsers;
  }

  updateConversations = (latestMessage, conversations) => {
    let updatedConversations = conversations;
    if (latestMessage) {
      if (latestMessage.newConversation) {
        updatedConversations[latestMessage.correspondent] =
          latestMessage.newConversation;
      } else {
        updatedConversations[latestMessage.correspondent].messages.push(
          latestMessage.message
        );
      }
    }
    return updatedConversations;
  };
}
