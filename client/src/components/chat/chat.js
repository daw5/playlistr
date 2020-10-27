import React, { useState } from "react";
import "./chat.scss";
import TextField from "@material-ui/core/TextField";
import NativeListener from "react-native-listener";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { SocketService } from "../../services";

require("dotenv").config();

export default function Chat(props) {
  const socketService = new SocketService();
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = (evt) => {
    if (evt.key === "Enter" || evt.type === "click") {
      evt.preventDefault();
      const message = messageToSend;
      setMessageToSend("");
      socketService.sendMessage(props.correspondent._id, message);
    }
  };

  return (
    <div id="chatContainer">
      <div id="chatHeaderContainer">
        <KeyboardBackspaceIcon
          id="backArrow"
          onClick={() => props.setCorrespondent(null)}
          style={{ fontSize: 40 }}
        />
        <h2 id="chatHeader">{props.correspondent.email}</h2>
      </div>
      <div id="messageSendingArea">
        {/* <NativeListener onKeyDow> */}
        <TextField
          onKeyDown={(evt) => sendMessage(evt)}
          value={messageToSend}
          className="send-message-text-area"
          onChange={(evt) => setMessageToSend(evt.target.value)}
          placeholder="Say something!"
          multiline
        />
        {/* </NativeListener> */}
        <Button
          id="sendMessageButton"
          onClick={(evt) => sendMessage(evt)}
          variant="contained"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
