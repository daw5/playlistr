import React, { Component, Fragment } from "react";
import io from "socket.io-client";

let socket;

class Socket extends Component {
  constructor(props) {
    super(props);

    socket = io.connect("http://localhost:4001");
  }
  componentDidMount() {}

  authenticateSocket() {
    socket.on("connect", function () {
      socket.emit("authenticate", {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYXJjaG9uaXN0QHByb3Rvbm1haWwuY29tIiwiaWF0IjoxNjAyNjUzMjc5LCJleHAiOjE2MTI2NTMyNzl9.AbhrJ3xBh5u1cxcb9f-t0wxE_cF4yVmt6EIHqC0EnFU",
      });

      socket.on("message", function (data) {
        console.log("data: ", data);
      });
    });
  }

  sendMessage() {
    socket.emit("message", {
      reciever_id: "5f88d55f006a5b43f5a54d5b",
      contents: "This is kind of just a standard test message ya know",
    });
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  render() {
    return <Fragment />;
  }
}

export default Socket;
