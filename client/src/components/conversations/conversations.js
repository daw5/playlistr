import React, { useState, useEffect } from "react";
import "./conversations.scss";
import { UserService } from "../../services";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ConversationSnippet } from "..";

require("dotenv").config();

export default function Conversations(props) {
  const users = props.users
    ? delete props.users[props.currentUser._id] && Object.values(props.users)
    : [];
  const userService = new UserService();

  return (
    <div id="conversationsContainer">
      <div id="searchContainer">
        <Autocomplete
          id="users-list"
          className="users-list-autocomplete"
          options={users}
          onChange={(evt, correspondent) => {
            props.setMessages(
              userService.getMessages(props.conversations, correspondent._id)
            );
            props.setCorrespondent(correspondent);
          }}
          getOptionLabel={(option) => option.email}
          renderInput={(params) => (
            <TextField {...params} label="User" variant="outlined" />
          )}
        />
      </div>
      <div id="conversation-snippets-container">
        {props.conversations &&
          Object.keys(props.conversations).map((correspondent) => (
            <div
              key={`conversation${props.conversations[correspondent]._id}`}
              className={"conversation-snippet-container"}
              onClick={(evt) => {
                props.setMessages(
                  userService.getMessages(
                    props.conversations,
                    correspondent._id
                  )
                );
                props.setCorrespondent(props.users[correspondent]);
              }}
            >
              <ConversationSnippet
                currentUser={props.currentUser}
                correspondent={props.users[correspondent]}
                conversation={props.conversations[correspondent]}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
