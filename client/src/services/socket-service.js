import { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001");

class SocketService extends Component {
  authenticateSocket(setLatestMessage) {
    socket.on("connect", function () {
      socket.emit("authenticate");

      socket.on("message", function (data) {
        setLatestMessage(data);
      });
    });
  }

  sendMessage(reciever_id, contents) {
    socket.emit("message", { reciever_id, contents });
  }
}

export default SocketService;
