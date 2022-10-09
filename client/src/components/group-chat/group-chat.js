import React, { useState, useRef, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";
import { messagingService } from "../../services";
import * as dayjs from "dayjs";
import "./group-chat.scss";
import "../chat/chat.scss";

require("dotenv").config();

export default function GroupChat(props) {
  const [contributed, setContributed] = useState(false);
  const [username, setUsername] = useState(null);
  const [recentGroup, setRecentGroup] = useState(null);

  const [conversation, setConversation] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messagesSent, setMessagesSent] = useState(0);
  const [latestMessage, setLatestMessage] = useState(null);
  const [messageToSend, setMessageToSend] = useState("");
  const [newMessageCount, incrementNewMessageCount] = useState(0);
  const [fetchCount, incrementFetchCount] = useState(0);

  const messagesContainer = useRef(null);
  const endOfChat = useRef(null);
  const scrollPosition = useRef(null);

  useEffect(() => {
    initializeChat();
  }, [props.socket]);

  useEffect(() => {
    getConversation();
  }, [props.group]);

  useEffect(() => {
    if (latestMessage) {
      setMessages([latestMessage, ...messages]);
      incrementNewMessageCount(newMessageCount + 1);
    }
  }, [latestMessage]);

  useEffect(() => {
    if (fetchCount > 0 && messages.length > 30)
      scrollPosition.current.scrollIntoView();
  }, [fetchCount]);

  useEffect(() => {
    endOfChat.current.scrollIntoView();
  }, [newMessageCount]);

  const getConversation = () => {
    messagingService
      .findConversationByPlaylist(props.playlistId)
      .then((conversation) => {
        setConversation(conversation);
        setMessages(conversation ? [...conversation.messages] : []);
        incrementNewMessageCount(newMessageCount + 1);
      });
  };

  const throttleMessages = () => {
    if (messagesSent === 0) {
      setTimeout(() => {
        setMessagesSent(0);
      }, 5000);
    }
    setMessagesSent(messagesSent + 1);
  };

  const initializeChat = () => {
    setUsername(messagingService.getUsername(props.currentUser));
    props.socket.emit("join-group", props.group, recentGroup);
    setRecentGroup(props.group);
    props.socket.on("group-message", function (data) {
      setLatestMessage(data);
    });
  };

  const getMessages = () => {
    messagingService
      .fetchMoreGroupMessages(
        props.playlistId,
        conversation._id,
        messages.length
      )
      .then((newMessages) => {
        if (newMessages) {
          setMessages(messages.concat(newMessages));
          incrementFetchCount(fetchCount + 1);
        }
      });
  };

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
          username: username,
        },
        props.group,
        props.playlistId
      ) && setMessageToSend("");
    }
  };

  const displayMessages = () => {
    const messagesToRender = [];
    for (let i = messages.length - 1; i >= 0; i--) {
      messagesToRender.push(
        <div className="message" key={`message${i}`}>
          <p className="message-sender">{messages[i].sender.username}</p>
          <p className="group-message-content">{messages[i].contents}</p>
          <p className="group-message-timestamp">
            {dayjs(messages[i].dateCreated).format("h:ma")}
          </p>
        </div>
      );

      if (i === messages.length - 30)
        messagesToRender.push(
          <div key="scrollPosition" ref={scrollPosition}></div>
        );
    }
    return messagesToRender;
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
      <div
        id="groupMessagesContainer"
        ref={messagesContainer}
        onScroll={(evt) => evt.target.scrollTop === 0 && getMessages()}
      >
        {displayMessages()}
        <div ref={endOfChat}></div>
      </div>
      <div id="groupChatFooter">
        <div className="input-container">
          <div className="text-input-container">
            <TextField
              onKeyDown={(evt) =>
                evt.key === "Enter" && sendMessage(evt, messageToSend)
              }
              placeholder={
                props.currentUser
                  ? "Send a message"
                  : "Log in to send a message"
              }
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
