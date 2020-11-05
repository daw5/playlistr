import React, { useState, useRef, useEffect } from "react";
import { PlaylistService } from "../../services";

import "./playlist-create.scss";

require("dotenv").config();

export default function Playlist(props) {
  useEffect(() => {
    const playlistService = new PlaylistService();
    playlistService
      .createPlaylist("goochmember", [
        "https://img.www.youtube.com/watch?v=UToqjzbV1iA",
        "https://www.youtube.com/watch?v=qRZmdzCGLYw",
      ])
      .then((playlist) => {
        console.log("playlist: ", playlist);
      });
    playlistService.getPlaylists().then((playlist) => {
      console.log("playlist: ", playlist);
    });
  }, []);
  return <div className="playlist-create-container"></div>;
}
