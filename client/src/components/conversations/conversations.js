import React from "react";
import "./conversations.scss";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ConversationSnippet } from "..";

require("dotenv").config();

export default function Conversations(props) {
  const users = props.users
    ? delete props.users[props.currentUser._id] && Object.values(props.users)
    : [];

  return (
    <div id="conversationsContainer">
      <div id="searchContainer">
        <Autocomplete
          id="users-list"
          className="users-list-autocomplete"
          options={users}
          onChange={(evt, correspondent) => {
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
                props.setCorrespondent(props.users[correspondent]);
              }}
            >
              <ConversationSnippet
                currentUser={props.currentUser}
                correspondent={props.users[correspondent]}
                message={props.conversations[correspondent].messages[0]}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
