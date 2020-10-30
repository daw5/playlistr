import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { Conversations, Chat } from "../";
import { UserService, MessagingService } from "../../services";

require("dotenv").config();

export default function Messaging(props) {
  const [correspondent, setCorrespondent] = useState(null);
  const [conversations, setConversations] = useState({});
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState();
  const [messagingService, setMessagingService] = useState(null);
  useEffect(() => {
    setMessagingService(new MessagingService());
    const userService = new UserService();
    userService
      .getConversations(props.currentUser._id)
      .then((conversations) => {
        setConversations(conversations);
      });
    props.socket.on("message", function (data) {
      setLatestMessage(data);
    });
  }, []);

  useEffect(() => {
    if (latestMessage) {
      setConversations(
        messagingService.updateConversations(latestMessage, conversations)
      );
      setNewMessageCount(newMessageCount + 1);
      messagingService.fetchMoreMessages(
        conversations[correspondent._id].messages.length,
        conversations[correspondent._id]._id
      );
    }
  }, [latestMessage]);

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
          messages={
            conversations[correspondent._id]
              ? [...conversations[correspondent._id].messages]
              : []
          }
          newMessageCount={newMessageCount}
          correspondent={correspondent}
          setCorrespondent={setCorrespondent}
        />
      )}
    </div>
  );
}
