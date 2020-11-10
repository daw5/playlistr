import React, { useState, useRef, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { MessagingService } from "../../services";
import "./group-chat.scss";
import "../chat/chat.scss";

require("dotenv").config();

export default function GroupChat(props) {
  const [messages, setMessages] = useState([]);
  const [messagesSent, setMessagesSent] = useState(0);
  const [messageToSend, setMessageToSend] = useState("");
  const [messagingService, setMessagingService] = useState(null);
  const endOfChat = useRef(null);

  useEffect(() => {
    setMessagingService(new MessagingService());
  }, []);

  useEffect(() => {
    setMessages([]);
  }, [props.group]);

  const throttleMessages = () => {
    if (messagesSent === 0) {
      setTimeout(() => {
        setMessagesSent(0);
      }, 5000);
    }
    setMessagesSent(messagesSent + 1);
  };

  useEffect(() => {
    props.latestMessage && setMessages([props.latestMessage, ...messages]);
  }, [props.latestMessage]);

  const sendMessage = (evt, messageToSend) => {
    if (messageToSend.length > 0 && messagesSent < 3) {
      throttleMessages();
      messagingService.sendGroupMessage(
        evt,
        messageToSend,
        {
          _id: props.currentUser._id || "",
          email: props.currentUser.email || "",
        },
        props.group
      ) && setMessageToSend("");
    }
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
            placeholder="Send a message"
            value={messageToSend}
            className="messageInput"
            onChange={(evt) => setMessageToSend(evt.target.value)}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <Button
            className="standardSubmitButton"
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
