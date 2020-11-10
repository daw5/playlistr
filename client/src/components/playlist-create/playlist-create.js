import React, { useState, useRef, useEffect } from "react";
import { playlistService } from "../../services";
import { SortableGrid } from "..";

import "./playlist-create.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [playlist, setPlaylist] = useState({
    title: "",
    urls: [
      "https://www.youtube.com/watch?v=q187sD7l3BM",
      "https://www.youtube.com/watch?v=Ozw-IpWalJs",
    ],
  });
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
      <SortableGrid items={playlist.urls} />
    </div>
  );
}
