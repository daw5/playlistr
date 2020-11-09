import React from "react";
import ReactPlayer from "react-player";

import "./player.scss";

require("dotenv").config();

export default function Player(props) {
  return (
    <div className="player-wrapper">
      {props.currentTrack ? (
        <ReactPlayer
          className="react-player"
          url={props.currentTrack}
          width="100%"
          height="100%"
          controls={true}
          onEnded={props.trackForward}
          playing={true}
        />
      ) : (
        <h2 style={{ color: "white", margin: "auto", textAlign: "center" }}>
          No Playlist Selected
        </h2>
      )}
    </div>
  );
}
