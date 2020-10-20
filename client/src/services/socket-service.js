import React, { Component, Fragment } from "react";
import io from "socket.io-client";

let socket;

class SocketService extends Component {
  constructor(props) {
    super(props);

    socket = io.connect("http://localhost:4001");
  }
  componentDidMount() {
    this.authenticateSocket();
  }

  authenticateSocket() {
    socket.on("connect", function () {
      socket.emit("authenticate");

      socket.on("message", function (data) {
        console.log("data: ", data);
      });
    });
  }

  sendMessage(reciever_id, contents) {
    socket.emit("message", {
      reciever_id,
      contents,
    });
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return <Fragment />;
  }
}

export default SocketService;
