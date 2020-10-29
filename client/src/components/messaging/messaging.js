import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { Conversations, Chat } from "../";
import { UserService, MessagingService } from "../../services";

require("dotenv").config();

export default function Messaging(props) {
  const [correspondent, setCorrespondent] = useState(null);
  const [conversations, setConversations] = useState({});
  const userService = new UserService();
  const messagingService = new MessagingService();

  useEffect(() => {
    userService
      .getConversations(props.currentUser._id)
      .then((conversations) => {
        setConversations(conversations);
      });
  }, []);

  useEffect(() => {
    setConversations(
      messagingService.updateConversations(props.latestMessage, conversations)
    );
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
          setCorrespondent={setCorrespondent}
        />
      )}
      {correspondent && (
        <Chat
          conversation={
            conversations[correspondent._id] && conversations[correspondent._id]
          }
          correspondent={correspondent}
          setCorrespondent={setCorrespondent}
        />
      )}
    </div>
  );
}
