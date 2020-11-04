import React, { useState, useRef, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Player, GroupChat } from "..";

import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  return (
    <div className="playlist-container">
      <div className="playlist">
        <button className="back-button">
          <ChevronLeftIcon style={{ fontSize: 45 }} />
        </button>
        <Player />
        <button className="forward-button">
          {" "}
          <ChevronRightIcon style={{ fontSize: 45 }} />
        </button>
      </div>
      {/* <div className="group-chat-container"> */}
      <GroupChat />
      {/* </div> */}
    </div>
  );
}
