import React, { useState, useRef, useEffect } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { playlistService } from "../../services";
import { Player, GroupChat } from "..";
import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [playlist, setPlaylist] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const group = `group${props.match.params.id}`;

  useEffect(() => {
    playlist && props.socket.emit("leave-group", group);
    playlistService.getPlaylist(props.match.params.id).then((playlist) => {
      setPlaylist(playlist);
      props.socket.emit("join-group", group);
      props.socket.on("group-message", function (data) {
        setLatestMessage(data);
      });
    });
  }, [props.match.params.id]);

  const trackBack = () => {
    currentTrackIndex - 1 >= 0 && setCurrentTrackIndex(currentTrackIndex - 1);
  };

  const trackForward = () => {
    currentTrackIndex + 1 <= playlist.urls.length - 1 &&
      setCurrentTrackIndex(currentTrackIndex + 1);
  };

  return (
    <div className="playlist-container">
      <div className="playlist">
        <button className="back-button">
          <ChevronLeftIcon onClick={trackBack} style={{ fontSize: 45 }} />
        </button>
        {playlist && (
          <Player
            currentTrack={playlist.urls[currentTrackIndex]}
            trackForward={trackForward}
          />
        )}
        <button className="forward-button">
          {" "}
          <ChevronRightIcon onClick={trackForward} style={{ fontSize: 45 }} />
        </button>
      </div>
      <GroupChat
        currentUser={props.currentUser}
        latestMessage={latestMessage}
        group={group}
      />
    </div>
  );
}
