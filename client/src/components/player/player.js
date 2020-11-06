import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import "./player.scss";

require("dotenv").config();

export default function Player(props) {
  return (
    <div className="player-wrapper">
      {props.playlist ? (
        <ReactPlayer
          className="react-player"
          url={props.playlist.urls}
          width="100%"
          height="100%"
          controls={true}
        />
      ) : (
        <h2 style={{ color: "white", margin: "auto", textAlign: "center" }}>
          No Playlist Selected
        </h2>
      )}
    </div>
  );
}
