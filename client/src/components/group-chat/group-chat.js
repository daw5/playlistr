import React, { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MessagingService } from "../../services";
import "./group-chat.scss";

require("dotenv").config();

export default function GroupChat(props) {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [messagingService, setMessagingService] = useState(null);
  const endOfChat = useRef(null);
  const scrollPosition = useRef(null);

  useEffect(() => {
    setMessagingService(new MessagingService());
  }, []);

  const sendMessage = (evt, messageToSend) => {
    messagingService.sendPrivateMessage(
      evt,
      messageToSend,
      props.correspondent._id
    ) && setMessageToSend("");
  };

  const displayMessages = () => {
    const messages = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      messages.push(
        <div
          key={`message${messages[i]._id}`}
          className={
            messages[i].sender === props.correspondent._id
              ? "their-message"
              : "my-message"
          }
        >
          <div className={"message"}>{messages[i].contents}</div>
        </div>
      );

      if (i === messages.length - 30)
        messages.push(<div key="scrollPosition" ref={scrollPosition}></div>);
    }
    return messages;
  };
  return (
    <div className="group-chat">
      <div
        id="groupMessagesContainer"
        onScroll={(evt) => evt.target.scrollTop === 0 && props.getMessages()}
      >
        {displayMessages()}
        <div ref={endOfChat}></div>
      </div>
      <div id="groupChatFooter">
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
