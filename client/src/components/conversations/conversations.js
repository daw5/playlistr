import React from "react";
import { UserService } from "../../services";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ConversationSnippet } from "..";
import "./conversations.scss";

require("dotenv").config();

export default function Conversations(props) {
  const userService = new UserService();
  const users = props.users ? Object.values(props.users) : [];

  return (
    <div id="conversationsContainer">
      <div id="searchContainer">
        <Autocomplete
          id="users-list"
          className="users-list-autocomplete"
          name="recipient"
          options={users}
          onChange={(evt) => props.setRecipient(users[evt.target.value])}
          getOptionLabel={(option) => option.email}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="User" variant="outlined" />
          )}
        />
      </div>
      <div>
        {props.conversations &&
          props.conversations.map((conversation) => (
            <ConversationSnippet
              key={`conversation${conversation._id}`}
              users={userService.getUsersRelevantToConversation(
                props.users,
                conversation
              )}
              conversation={conversation}
            />
          ))}
      </div>
    </div>
  );
}
