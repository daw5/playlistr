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
  // const getMessages = () => {
  //   if (conversations[correspondent._id]) {
  //     return conversations[correspondent._id].messages;
  //   } else if (props.latestMessage) {
  //     return [props.latestMessage.message];
  //   } else {
  //     return [];
  //   }
  // };
  console.log("conversations: ", conversations);

  useEffect(() => {
    userService
      .getConversations(props.currentUser._id)
      .then((conversations) => {
        setConversations(conversations);
      });
  }, []);

  useEffect(() => {
    if (props.latestMessage) {
      if (props.latestMessage.newConversation) {
        console.log("tell me im in here");
        conversations[props.latestMessage.correspondent] =
          props.latestMessage.newConversation;
      } else {
        conversations[props.latestMessage.correspondent].messages.push(
          props.latestMessage.message
        );
      }
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
          messages={
            conversations[correspondent._id]
              ? conversations[correspondent._id].messages
              : []
          }
          correspondent={correspondent}
          setCorrespondent={setCorrespondent}
        />
      )}
    </div>
  );
}
