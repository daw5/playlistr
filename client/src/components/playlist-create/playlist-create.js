import React, { useState, useRef, useEffect } from "react";
import { playlistService, thumbnailService } from "../../services";
import { Button, TextField } from "@material-ui/core";
import { SortableGrid } from "..";

import "./playlist-create.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [tracks, setTracks] = useState([]);
  const [trackToAdd, setTrackToAdd] = useState("");

  // const createPlaylist = () => {
  //   playlistService
  //     .createPlaylist(playlist.title, playlist.urls)
  //     .then((playlist) => {
  //       console.log("playlist: ", playlist);
  //       // navigate to newly created playlist
  //     });
  // };

  const addTrack = () => {
    const thumbnailUrl = thumbnailService.getThumbnailURL(trackToAdd);
    setTracks([...tracks, { url: trackToAdd, thumbnailUrl }]);
  };

  return (
    <div className="playlist-create-container">
      <div className="inputContainer">
        <TextField
          onKeyDown={(evt) => evt.key === "Enter" && addTrack(evt)}
          placeholder="Paste link to media here"
          value={trackToAdd}
          className="messageInput"
          onChange={(evt) => setTrackToAdd(evt.target.value)}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
        <Button
          className="sendMessageButton"
          onClick={(evt) => addTrack(evt)}
          variant="contained"
        >
          Send
        </Button>
      </div>
      <SortableGrid tracks={tracks} setTracks={setTracks} />
    </div>
  );
}
