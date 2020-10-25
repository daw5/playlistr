import React from "react";
import { UserService } from "../../services";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ConversationSnippet } from "..";
import "./conversations.scss";

require("dotenv").config();

export default function Conversations(props) {
  const userService = new UserService();

  return (
    <div id="conversationsContainer">
      <div id="searchContainer">
        <Autocomplete
          id="users-list"
          className="users-list-autocomplete"
          name="recipient"
          options={props.users ? Object.values(props.users) : []}
          onChange={(evt) => props.setRecipient(props.users[evt.target.value])}
          getOptionLabel={(option) => option.email}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="User" variant="outlined" />
          )}
        />
      </div>
      <div>
        {props.conversations &&
          props.conversations.forEach(async (conversation) => (
            <ConversationSnippet
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
