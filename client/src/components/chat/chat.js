import React, { useState } from "react";
import "./chat.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { UserService } from "../../services";

require("dotenv").config();

export default function Chat(props) {
  const userService = new UserService();
  const [messageToSend, setMessageToSend] = useState("");
  const sendMessage = (evt, messageToSend) => {
    userService.sendPrivateMessage(
      evt,
      messageToSend,
      props.correspondent._id
    ) && setMessageToSend("");
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
      <div id="personalMessagesContainer">
        {props.messages.map((message) => (
          <div className="message">{message.contents}</div>
        ))}
      </div>
      <div id="chatFooter">
        <div id="inputContainer">
          <TextField
            onKeyDown={(evt) => sendMessage(evt, messageToSend)}
            value={messageToSend}
            id="messageInput"
            onChange={(evt) => setMessageToSend(evt.target.value)}
            placeholder="Say something!"
            multiline
          />
          <Button
            id="sendMessageButton"
            onClick={(evt) => sendMessage(evt, messageToSend)}
            variant="contained"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
