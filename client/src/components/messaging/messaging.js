import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { Conversations, Chat } from "../";
import { UserService } from "../../services";

require("dotenv").config();

export default function Messaging(props) {
  const [correspondent, setCorrespondent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState({});
  const userService = new UserService();

  useEffect(() => {
    userService
      .getConversations(props.currentUser._id)
      .then((conversations) => {
        setConversations(conversations);
      });
  }, []);

  useEffect(() => {
    if (props.latestMessage) {
      conversations[props.latestMessage.correspondent].messages.push(
        props.latestMessage.message
      );
    }
  }, [props.latestMessage]);

  return (
    <div
      className={
        props.messagingSidebarOpen
          ? "visible messaging-container"
          : "hidden messaging-container"
      }
    >
      {!correspondent && (
        <Conversations
          users={props.users}
          currentUser={props.currentUser}
          conversations={conversations}
          setMessages={setMessages}
          setCorrespondent={setCorrespondent}
        />
      )}
      {correspondent && (
        <Chat
          messages={conversations[correspondent._id].messages}
          correspondent={correspondent}
          setCorrespondent={setCorrespondent}
        />
      )}
    </div>
  );
}
