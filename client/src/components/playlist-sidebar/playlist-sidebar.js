import React from "react";
import { PlaylistSidebarImage } from "..";
import { useHistory } from "react-router-dom";
import "./playlist-sidebar.scss";

require("dotenv").config();

export default function PlaylistSidebar(props) {
  const history = useHistory();

  const changeTrack = (trackIndex) => {
    history.push(`/playlist/${props.playlist._id}?track=${trackIndex}`);
    props.setCurrentTrackIndex(trackIndex);
  };

  return (
    <div className="playlist-sidebar">
      {props.playlist &&
        props.playlist.tracks.map((track, index) => (
          <div
            onClick={() => changeTrack(index)}
            key={`track${index}`}
            className="playlist-sidebar-snippet"
          >
            <PlaylistSidebarImage
              track={track}
              nowPlaying={props.currentTrackIndex === index}
            ></PlaylistSidebarImage>
          </div>
        ))}
    </div>
  );
}
