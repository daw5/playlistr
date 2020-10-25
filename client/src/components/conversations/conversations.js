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
  // populate conversations with users from ids

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
      <div id="conversation-snippets-container">
        {props.conversations &&
          props.conversations.map((conversation) => (
            <ConversationSnippet
              key={`conversation${conversation._id}`}
              currentUser={props.currentUser}
              correspondent={userService.getCorrespondent(
                props.currentUser._id,
                conversation.users,
                props.users
              )}
              conversation={conversation}
            />
          ))}
      </div>
    </div>
  );
}
