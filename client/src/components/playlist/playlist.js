import React, { useState, useEffect } from "react";
import { playlistService, messagingService } from "../../services";
import { Player, GroupChat, PlaylistSidebar } from "..";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [playerReady, setPlayerReady] = useState(false);
  const [username, setUsername] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [recentGroup, setRecentGroup] = useState(null);
  const group = props.match.params.id;

  useEffect(() => {
    return () => props.socket && messagingService.leaveGroup(group);
  }, []);

  useEffect(() => {
    setNewPlaylist();
  }, [props.match.params.id]);

  useEffect(() => {
    initializeChat();
  }, [props.socket]);

  const setNewPlaylist = () => {
    const urlParam = new URLSearchParams(window.location.search).get("track");
    const track = urlParam ? urlParam - 1 : 0;
    setCurrentTrackIndex(track);
    playlistService.getPlaylist(props.match.params.id).then((playlist) => {
      props.setCurrentPlaylist(playlist);
      setPlaylist(playlist);
      initializeChat();
    });
  };

  const initializeChat = () => {
    setUsername(messagingService.getUsername(props.currentUser));
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
        {playerReady && (
          <button className="back-button">
            <ChevronLeftIcon onClick={trackBack} style={{ fontSize: 45 }} />
          </button>
        )}
        {playlist && (
          <React.Fragment>
            <Player
              currentTrack={
                playlist.tracks[currentTrackIndex] &&
                playlist.tracks[currentTrackIndex].url
              }
              trackForward={trackForward}
              setPlayerReady={setPlayerReady}
            />
          </React.Fragment>
        )}
        {playerReady && (
          <button className="forward-button">
            {" "}
            <ChevronRightIcon onClick={trackForward} style={{ fontSize: 45 }} />
          </button>
        )}
      </div>
      {playerReady && (
        <GroupChat
          currentUser={props.currentUser}
          username={username}
          latestMessage={latestMessage}
          group={group}
        />
      )}
      <PlaylistSidebar playlist={playlist}></PlaylistSidebar>
    </div>
  );
}
