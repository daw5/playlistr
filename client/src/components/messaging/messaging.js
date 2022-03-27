import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { Conversations, Chat } from "../";
import { userService, messagingService } from "../../services";

require("dotenv").config();

export default function Messaging(props) {
  const [correspondent, setCorrespondent] = useState(null);
  const [conversations, setConversations] = useState({});
  const [latestMessage, setLatestMessage] = useState();
  const [newMessageCount, incrementNewMessageCount] = useState(0);
  const [fetchCount, incrementFetchCount] = useState(0);

  useEffect(() => {
    if (props.currentUser) {
      userService
        .getConversations(props.currentUser._id)
        .then((conversations) => {
          setConversations(conversations);
          props.socket.on("message", function (data) {
            setLatestMessage(data);
          });
        });
    }
  }, [props.socket]);

  useEffect(() => {
    if (latestMessage) {
      setConversations(
        messagingService.updateConversations(latestMessage, conversations)
      );
      incrementNewMessageCount(newMessageCount + 1);
    }
  }, [latestMessage]);

  const getMessages = () => {
    messagingService
      .fetchMoreMessages(conversations, correspondent._id)
      .then((updatedConversations) => {
        if (updatedConversations) {
          setConversations(updatedConversations);
          incrementFetchCount(fetchCount + 1);
        }
      });
  };

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
          fetchCount={fetchCount}
          newMessageCount={newMessageCount}
          correspondent={correspondent}
          getMessages={getMessages}
          setCorrespondent={setCorrespondent}
        />
      )}
    </div>
  );
}
