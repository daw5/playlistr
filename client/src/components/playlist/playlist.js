import React, { useState, useRef, useEffect } from "react";
import { Player } from "..";

import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  return (
    <div className="playlist-container">
      <Player />
    </div>
  );
}
