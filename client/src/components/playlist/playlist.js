import React, { useState, useRef, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Player } from "..";

import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  return (
    <div className="playlist-container">
      <div className="playlist">
        <button className="back-button">
          <ChevronLeftIcon fontSize="large" />
        </button>
        <Player />
        <button className="forward-button">
          {" "}
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>
      <div className="chat-container"></div>
    </div>
  );
}
