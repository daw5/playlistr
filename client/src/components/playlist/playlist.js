import React, { useState, useRef, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { playlistService } from "../../services";
import { Player, GroupChat } from "..";

import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    props.playlistId &&
      playlistService.getPlaylist(props.playlistId).then((playlist) => {
        setPlaylist(playlist);
      });
  }, [props.playlistId]);

  return (
    <div className="playlist-container">
      <div className="playlist">
        <button className="back-button">
          <ChevronLeftIcon style={{ fontSize: 45 }} />
        </button>
        <Player playlist={playlist} />
        <button className="forward-button">
          {" "}
          <ChevronRightIcon style={{ fontSize: 45 }} />
        </button>
      </div>
      <GroupChat />
    </div>
  );
}
