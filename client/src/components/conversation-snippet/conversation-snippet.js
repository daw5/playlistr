import React, { useState, useEffect } from "react";
import "./conversation-snippet.scss";

require("dotenv").config();

export default function Conversations(props) {
  const messages = props.conversation.messages;
  return (
    <div className="conversation-snippet">
      <p>
        <b>{props.correspondent && props.correspondent.email}</b>
      </p>
      <p>{messages && messages[messages.length - 1].contents}</p>
    </div>
  );
}
