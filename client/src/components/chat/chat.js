import React, { useState, useRef, useEffect } from "react";
import "./chat.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { MessagingService } from "../../services";

require("dotenv").config();

export default function Chat(props) {
  const [messageToSend, setMessageToSend] = useState("");
  const [messagingService, setMessagingService] = useState(null);
  const endOfChat = useRef(null);

  const sendMessage = (evt, messageToSend) => {
    messagingService.sendPrivateMessage(
      evt,
      messageToSend,
      props.correspondent._id
    ) && setMessageToSend("");
  };

  useEffect(() => {
    setMessagingService(new MessagingService());
  }, []);

  useEffect(() => {
    endOfChat.current.scrollIntoView();
  }, [props.newMessageCount]);

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
        {props.conversation &&
          props.conversation.messages.map((message) => (
            <div
              key={`message${message._id}`}
              className={
                message.sender === props.correspondent._id
                  ? "their-message"
                  : "my-message"
              }
            >
              <div className={"message"}>{message.contents}</div>
            </div>
          ))}
        <div ref={endOfChat}></div>
      </div>
      <div id="chatFooter">
        <div id="inputContainer">
          <TextField
            onKeyDown={(evt) =>
              evt.key === "Enter" && sendMessage(evt, messageToSend)
            }
            value={messageToSend}
            id="messageInput"
            onChange={(evt) => setMessageToSend(evt.target.value)}
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
