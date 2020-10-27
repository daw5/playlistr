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
        <TextField
          onKeyDown={(evt) =>
            userService.sendPrivateMessage(
              evt,
              messageToSend,
              props.correspondent._id
            ) && setMessageToSend("")
          }
          value={messageToSend}
          className="send-message-text-area"
          onChange={(evt) => setMessageToSend(evt.target.value)}
          placeholder="Say something!"
          multiline
        />
        <Button
          id="sendMessageButton"
          onClick={(evt) =>
            userService.sendPrivateMessage(
              evt,
              messageToSend,
              props.correspondent._id
            ) && setMessageToSend("")
          }
          variant="contained"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
