import { Component } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4001");

class SocketService extends Component {
  authenticateSocket() {
    socket.on("connect", function () {
      socket.emit("authenticate");

      socket.on("message", function (data) {
        console.log("data: ", data);
      });

      socket.on("general", function (data) {
        console.log("general message data: ", data);
      });
    });
  }

  sendMessage(reciever_id, contents) {
    socket.emit("message", { reciever_id, contents });
  }

  sendGeneralMessage(contents) {
    socket.emit("general", contents);
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
}

export default SocketService;
