import React, { useState, useRef, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MessagingService } from "../../services";
import "./group-chat.scss";
import "../chat/chat.scss";

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
    props.latestMessage && setMessages([...messages, props.latestMessage]);
  }, [props.latestMessage]);

  const sendMessage = (evt, messageToSend) => {
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
      <div
        className="messagesContainer"
        onScroll={(evt) => evt.target.scrollTop === 0 && props.getMessages()}
      >
        {/* display messages here */}
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
            multiline
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
