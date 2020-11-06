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
      .createPlaylist("greasebucket", [
        "https://www.youtube.com/watch?v=jkfd6J0oDFg",
        "https://www.youtube.com/watch?v=VFNR-wFvOns",
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
