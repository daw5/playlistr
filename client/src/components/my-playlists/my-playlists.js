import React, { useEffect, useState } from "react";
import { playlistService } from "../../services";
import "./my-playlists.scss";

export default function MyPlaylists(props) {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    setPlaylists(playlistService.getUserPlaylists());
  }, []);
  return (
    <div className="my-playlists-container">
      <div className="playlist">
        <div className="playlist-head"></div>
        <div className="playlist-body"></div>
      </div>
    </div>
  );
}
