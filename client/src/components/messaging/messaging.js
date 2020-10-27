import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { Conversations, Chat } from "../";

require("dotenv").config();

export default function Messaging(props) {
  const [correspondent, setCorrespondent] = useState(null);
  const [messages, setMessages] = useState([]);

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
          setMessages={setMessages}
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
