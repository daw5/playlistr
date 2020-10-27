import React, { useState, useEffect } from "react";
import "./conversations.scss";
import { UserService } from "../../services";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ConversationSnippet } from "..";

require("dotenv").config();

export default function Conversations(props) {
  const users = props.users ? Object.values(props.users) : [];
  const userService = new UserService();

  return (
    <div id="conversationsContainer">
      <div id="searchContainer">
        <Autocomplete
          id="users-list"
          className="users-list-autocomplete"
          name="recipient"
          options={users}
          onChange={(evt, value) => props.setCorrespondent(value)}
          getOptionLabel={(option) => option.email}
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
