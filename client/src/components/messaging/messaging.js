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
  const users = props.users ? Object.values(props.users) : [];

  const socketService = new SocketService();
  const [recipient, setRecipient] = useState({});
  const [messageToSend, setMessageToSend] = useState("");

  return (
    <div
      className={
        props.messagingSidebarOpen
          ? "visible messaging-container"
          : "hidden messaging-container"
      }
    >
      {/* <Conversations
        users={props.users}
        conversations={props.conversations}
        setRecipient={setRecipient}
      /> */}
      <Autocomplete
        id="users-list"
        name="recipient"
        options={users}
        onChange={(evt) => setRecipient(users[evt.target.value])}
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
      </Button>
    </div>
  );
}
