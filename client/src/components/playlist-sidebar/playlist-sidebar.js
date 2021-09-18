import React from "react";
import { PlaylistSidebarImage } from "..";
import "./playlist-sidebar.scss";

require("dotenv").config();

export default function PlaylistSidebar(props) {
  return (
    <div className="playlist-sidebar">
      {props.playlist &&
        props.playlist.tracks.map((track, index) => (
          <div
            onClick={() => props.setCurrentTrackIndex(index)}
            key={`track${index}`}
            className="playlist-sidebar-snippet"
          >
            <PlaylistSidebarImage track={track}></PlaylistSidebarImage>
          </div>
        ))}
    </div>
  );
}
