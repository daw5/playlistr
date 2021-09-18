import React, { useState, useEffect } from "react";
import DefaultThumbnail from "../../assets/cassette.gif";
import "./playlist-sidebar.scss";

require("dotenv").config();

export default function PlaylistSidebar(props) {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    setPlaylist(props.playlist);
  }, [props.playlist]);

  return (
    <div className="playlist-sidebar">
      {props.playlist &&
        props.playlist.tracks.map((track, index) => (
          <div
            // onClick={() => play(props.playlist, index + 1)}
            key={`track${index}`}
          >
            <img
              class="playlist-sidebar-snippet"
              src={track.thumbnailUrl ? track.thumbnailUrl : DefaultThumbnail}
            />
          </div>
        ))}
    </div>
  );
}
