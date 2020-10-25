import React, { useState, useEffect } from "react";
import "./conversation-snippet.scss";

require("dotenv").config();

export default function Conversations(props) {
  const messages = props.conversation.messages;
  return (
    <div className="conversation-snippet">
      <p></p>
    </div>
  );
}
