import React from "react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import "./header.scss";

function Header(props) {
  return (
    <div id="header">
      <div id="messaging-icon-column">
        <div
          id="messaging-icon-container"
          onClick={props.toggleMessagingSidebar}
        >
          <ChatBubbleOutlineIcon
            id="messaging-icon-outline"
            style={{
              fontSize: 40,
            }}
            className={props.messagingSidebarOpen ? "hidden" : "visible"}
          ></ChatBubbleOutlineIcon>
          <ChatBubbleIcon
            id="messaging-icon-filled"
            style={{ fontSize: 40 }}
            className={props.messagingSidebarOpen ? "visible" : "hidden"}
          ></ChatBubbleIcon>
        </div>
      </div>
    </div>
  );
}

export default Header;
