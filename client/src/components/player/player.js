import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import "./player.scss";

require("dotenv").config();

export default function Player(props) {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url={[
          "https://www.youtube.com/watch?v=dbDRkaNO8dE",
          "https://youtu.be/IGM1T0t7qts",
          "https://www.youtube.com/watch?v=KOEX-8GhicU",
        ]}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
}
