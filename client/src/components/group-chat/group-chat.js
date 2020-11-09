import React, { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MessagingService } from "../../services";
import "./group-chat.scss";
import "../chat/chat.scss";
import { Divider } from "@material-ui/core";

require("dotenv").config();

export default function GroupChat(props) {
  const [messages, setMessages] = useState([]);
  const [messageToSend, setMessageToSend] = useState("");
  const [messagingService, setMessagingService] = useState(null);
  const endOfChat = useRef(null);

  useEffect(() => {
    setMessagingService(new MessagingService());
  }, []);

  useEffect(() => {
    console.log("adding latestmessages");
    props.latestMessage && setMessages([props.latestMessage, ...messages]);
  }, [props.latestMessage]);

  const sendMessage = (evt, messageToSend) => {
    console.log("wefwefwefwe: ", messages);
    messagingService.sendGroupMessage(
      evt,
      messageToSend,
      {
        _id: props.currentUser._id,
        email: props.currentUser.email,
      },
      props.group
    ) && setMessageToSend("");
  };

  return (
    <div className="group-chat">
      <div id="groupMessagesContainer" className="messages-container">
        {messages.map((message, index) => (
          <div className="message" key={`message${index}`}>
            <p className="message-sender">{message.correspondent.email}</p>
            <p className="group-message-content">{message.message}</p>
          </div>
        ))}
        <div ref={endOfChat}></div>
      </div>
      <div id="groupChatFooter">
        <div className="inputContainer">
          <TextField
            onKeyDown={(evt) =>
              evt.key === "Enter" && sendMessage(evt, messageToSend)
            }
            value={messageToSend}
            className="messageInput"
            onChange={(evt) => setMessageToSend(evt.target.value)}
          />
          <Button
            className="sendMessageButton"
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
