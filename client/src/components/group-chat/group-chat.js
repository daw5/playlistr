import React, { useState, useRef, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { messagingService } from "../../services";
import "./group-chat.scss";
import "../chat/chat.scss";

require("dotenv").config();

export default function GroupChat(props) {
  const [messages, setMessages] = useState([]);
  const [contributed, setContributed] = useState(false);
  const [messagesSent, setMessagesSent] = useState(0);
  const [messageToSend, setMessageToSend] = useState("");
  const messagesContainer = useRef(null);

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
    setContributed(true);
    evt.preventDefault();
    if (messageToSend.length > 0 && messagesSent < 3) {
      throttleMessages();
      messagingService.sendGroupMessage(
        evt,
        messageToSend,
        {
          _id: props.currentUser ? props.currentUser._id : "",
          username: props.username,
        },
        props.group
      ) && setMessageToSend("");
    }
  };

  return (
    <div
      className={`${props.fullChat ? "full-height-group-chat" : "group-chat"}`}
    >
      <div className="group-chat-header">
        <div className="expand-group-chat-button">
          {/* <Button className="special-button"> */}
          <AspectRatioIcon
            onClick={props.toggleFullChat}
            className="expand-group-chat-icon"
            style={{ fontSize: 20 }}
          ></AspectRatioIcon>
          {/* </Button> */}
          <div className="gradient"></div>
          <div className="spotlight"></div>
        </div>
      </div>
      <div id="groupMessagesContainer" ref={messagesContainer}>
        {messages.map((message, index) => (
          <div className="message" key={`message${index}`}>
            <p className="message-sender">{message.correspondent.username}</p>
            <p className="group-message-content">{message.message}</p>
            <p className="group-message-timestamp">{message.timeStamp}</p>
          </div>
        ))}
      </div>
      <div id="groupChatFooter">
        <div className="input-container">
          <div className="text-input-container">
            <TextField
              onKeyDown={(evt) =>
                evt.key === "Enter" && sendMessage(evt, messageToSend)
              }
              placeholder="Send a message"
              value={messageToSend}
              className="message-input"
              onChange={(evt) => setMessageToSend(evt.target.value)}
              InputProps={{
                style: { color: "#fff" },
              }}
            />
            <div className="gradient"></div>
            {!contributed && <div className="spotlight"></div>}
          </div>
          <div className="send-button-container">
            <Button
              onMouseDown={(evt) => sendMessage(evt, messageToSend)}
              variant="contained"
            >
              Send
            </Button>
            <div className="gradient"></div>
            <div className="spotlight"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
