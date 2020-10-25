import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import { UserService, SocketService } from "../../services";
import { Conversations } from "../";
import "./messaging.scss";

require("dotenv").config();

export default function Messaging(props) {
  const userService = new UserService();
  const socketService = new SocketService();

  const [conversations, setConversations] = useState([]);
  const [recipient, setRecipient] = useState({});
  const [messageToSend, setMessageToSend] = useState("");

  useEffect(() => {
    userService.getConversations().then((conversations) => {
      setConversations(conversations);
    });
  }, []);

  return (
    <div
      className={
        props.messagingSidebarOpen
          ? "visible messaging-container"
          : "hidden messaging-container"
      }
    >
      <Conversations
        users={props.users}
        currentUser={props.currentUser}
        conversations={conversations}
        setRecipient={setRecipient}
      />
      {/* <Autocomplete
        id="users-list"
        name="recipient"
        options={props.users ? Object.values(props.users) : []}
        onChange={(evt) =>
          setRecipient(Object.values(props.users)[evt.target.value])
        }
        getOptionLabel={(option) => option.email}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="User" variant="outlined" />
        )}
      />
      <TextField
        id="standard-textarea"
        label="Multiline Placeholder"
        onChange={(evt) => setMessageToSend(evt.target.value)}
        placeholder="Placeholder"
        multiline
      />
      <Button
        onClick={() => socketService.sendMessage(recipient._id, messageToSend)}
        variant="contained"
      >
        Send Message
      </Button> */}
    </div>
  );
}
