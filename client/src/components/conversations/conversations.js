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
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    userService
      .getConversations(props.currentUser._id)
      .then((conversations) => {
        setConversations(conversations);
      });
  }, [props.currentUser]);

  return (
    <div id="conversationsContainer">
      <div id="searchContainer">
        <Autocomplete
          id="users-list"
          className="users-list-autocomplete"
          name="recipient"
          options={users}
          onChange={(evt, correspondent) => {
            props.setMessages(
              conversations.hasOwnProperty(correspondent._id)
                ? conversations[correspondent._id].messages
                : []
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
        {conversations &&
          Object.keys(conversations).map((correspondent) => (
            <div
              key={`conversation${conversations[correspondent]._id}`}
              onClick={(evt) => {
                props.setMessages(
                  conversations.hasOwnProperty(correspondent._id)
                    ? conversations[correspondent._id].messages
                    : []
                );
                props.setCorrespondent(props.users[correspondent]);
              }}
              className={"conversation-snippet-container"}
            >
              <ConversationSnippet
                currentUser={props.currentUser}
                correspondent={props.users[correspondent]}
                conversation={conversations[correspondent]}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
