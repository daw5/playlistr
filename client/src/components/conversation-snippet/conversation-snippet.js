import React from "react";
import "./conversation-snippet.scss";

require("dotenv").config();

export default function Conversations(props) {
  return (
    <div className="conversation-snippet">
      <p>
        <b>{props.correspondent && props.correspondent.email}</b>
      </p>
      <p>{props.message.contents}</p>
    </div>
  );
}
