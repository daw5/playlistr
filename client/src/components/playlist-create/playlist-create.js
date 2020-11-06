import React, { useState, useRef, useEffect } from "react";
import { playlistService } from "../../services";

import "./playlist-create.scss";

require("dotenv").config();

export default function Playlist(props) {
  useEffect(() => {
    createPlaylist();
  }, []);

  const createPlaylist = () => {
    playlistService
      .createPlaylist("goochmember", [
        "https://img.www.youtube.com/watch?v=UToqjzbV1iA",
        "https://www.youtube.com/watch?v=qRZmdzCGLYw",
      ])
      .then((playlist) => {
        console.log("playlist: ", playlist);
        // navigate to newly created playlist
      });
  };
  return (
    <div className="playlist-create-container">
      {/* form for creating playlist goes here */}
    </div>
  );
}
