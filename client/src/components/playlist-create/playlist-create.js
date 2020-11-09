import React, { useState, useRef, useEffect } from "react";
import { playlistService } from "../../services";

import "./playlist-create.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [playlist, setPlaylist] = useState({ title: "", urls: [] });
  useEffect(() => {
    createPlaylist();
  }, []);

  const createPlaylist = () => {
    playlistService
      .createPlaylist(playlist.title, playlist.urls)
      .then((playlist) => {
        console.log("playlist: ", playlist);
        // navigate to newly created playlist
      });
  };
  return (
    <div className="playlist-create-container">
      <p>I am playlist create</p>
      {/* form for creating playlist goes here */}
    </div>
  );
}
