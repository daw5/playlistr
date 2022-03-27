import React, { useState, useEffect } from "react";
import { playlistService } from "../../services";
import { Player, GroupChat, PlaylistSidebar } from "..";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [playerReady, setPlayerReady] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [fullChat, setFullChat] = useState(false);
  const group = props.match.params.id;

  useEffect(() => {
    setNewPlaylist();
  }, [group]);

  const toggleFullChat = () => {
    if (fullChat) {
      setFullChat(false);
    } else {
      setFullChat(true);
    }
  };

  const setNewPlaylist = () => {
    const urlParam = new URLSearchParams(window.location.search).get("track");
    const track = urlParam ? urlParam : 0;
    setCurrentTrackIndex(track);
    playlistService.getPlaylist(group).then((playlist) => {
      props.setCurrentPlaylist(playlist);
      setPlaylist(playlist);
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
      <div className="playlist-and-chat-container">
        <div className={`${fullChat ? "zero-height-playlist" : "playlist"}`}>
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
              <ChevronRightIcon
                onClick={trackForward}
                style={{ fontSize: 45 }}
              />
            </button>
          )}
        </div>
        {playlist && playerReady && (
          <GroupChat
            currentUser={props.currentUser}
            playlistId={playlist._id}
            socket={props.socket}
            group={group}
            fullChat={fullChat}
            toggleFullChat={toggleFullChat}
          />
        )}
      </div>
      <PlaylistSidebar
        setCurrentTrackIndex={setCurrentTrackIndex}
        currentTrackIndex={currentTrackIndex}
        playlist={playlist}
      ></PlaylistSidebar>
    </div>
  );
}
