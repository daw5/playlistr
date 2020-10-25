import React, { useState, useEffect } from "react";
import "./conversation-snippet.scss";

require("dotenv").config();

export default function Conversations(props) {
  const messages = props.conversations.messages;
  return (
    <div class="conversation-snippet">
      <p></p>
    </div>
  );
}
