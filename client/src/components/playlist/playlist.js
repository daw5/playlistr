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
  const [recentGroup, setRecentGroup] = useState(null);
  const group = `group${props.match.params.id}`;

  useEffect(() => {
    setNewPlaylist();
  }, [props.match.params.id]);

  useEffect(() => {
    initializeChat();
  }, [props.socket]);

  const setNewPlaylist = () => {
    setCurrentTrackIndex(0);
    playlistService.getPlaylist(props.match.params.id).then((playlist) => {
      setPlaylist(playlist);
      initializeChat();
    });
  };

  const initializeChat = () => {
    props.socket.emit("join-group", group, recentGroup);
    setRecentGroup(group);
    props.socket.on("group-message", function (data) {
      setLatestMessage(data);
    });
  };

  const trackBack = () => {
    currentTrackIndex - 1 >= 0 && setCurrentTrackIndex(currentTrackIndex - 1);
  };

  const trackForward = () => {
    currentTrackIndex + 1 <= playlist.tracks.length - 1 &&
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
            currentTrack={playlist.tracks[currentTrackIndex].url}
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
