import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import "./player.scss";

require("dotenv").config();

export default function Player(props) {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url="https://youtu.be/IGM1T0t7qts"
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}
