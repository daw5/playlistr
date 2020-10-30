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
  const scrollPosition = useRef(null);

  const sendMessage = (evt, messageToSend) => {
    messagingService.sendPrivateMessage(
      evt,
      messageToSend,
      props.correspondent._id
    ) && setMessageToSend("");
  };

  const displayMessages = () => {
    const messages = [];
    for (let i = props.messages.length - 1; i >= 0; i--) {
      messages.push(
        <div
          key={`message${props.messages[i]._id}`}
          className={
            props.messages[i].sender === props.correspondent._id
              ? "their-message"
              : "my-message"
          }
        >
          <div className={"message"}>{props.messages[i].contents}</div>
        </div>
      );

      if (i === props.messages.length - 30)
        messages.push(<div key="scrollPosition" ref={scrollPosition}></div>);
    }
    return messages;
  };

  useEffect(() => {
    setMessagingService(new MessagingService());
  }, []);

  useEffect(() => {
    props.fetchCount > 0 && scrollPosition.current.scrollIntoView();
  }, [props.fetchCount]);

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
      <div
        id="personalMessagesContainer"
        onScroll={(evt) => evt.target.scrollTop === 0 && props.getMessages()}
      >
        {displayMessages()}
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
