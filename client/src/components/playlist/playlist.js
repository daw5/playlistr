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
  const group = `group${props.match.params.id}`;
  useEffect(() => {
    playlist && props.socket.emit("leave-group", `group${playlist._id}`);
    playlistService.getPlaylist(props.match.params.id).then((playlist) => {
      setPlaylist(playlist);
      props.socket.emit("join-group", group);
      props.socket.on("group-message", function (data) {
        setLatestMessage(data);
        console.log("group mesage recieved: ", data);
      });
    });
  }, [props.match.params.id]);

  // store currently playing playlist url in state in this component along with index
  // when back or forward button clicked, grab new url using index and pass to player

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
      <GroupChat
        currentUser={props.currentUser}
        latestMessage={latestMessage}
        group={group}
      />
    </div>
  );
}
