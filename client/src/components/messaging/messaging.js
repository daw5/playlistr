import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { UserService } from "../../services";
import { Conversations, Chat } from "../";

require("dotenv").config();

export default function Messaging(props) {
  const [correspondent, setCorrespondent] = useState(null);
  const [conversations, setConversations] = useState([]);
  const userService = new UserService();

  useEffect(() => {
    if (!correspondent) {
      userService.getConversations().then((conversations) => {
        setConversations(conversations);
      });
    }
  }, [correspondent]);

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
          conversations={conversations}
          currentUser={props.currentUser}
          setCorrespondent={setCorrespondent}
        />
      )}
      {correspondent && (
        <Chat
          correspondent={correspondent}
          setCorrespondent={setCorrespondent}
        />
      )}
    </div>
  );
}
