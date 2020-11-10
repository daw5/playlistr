import React, { useState, useRef, useEffect } from "react";
import { playlistService, thumbnailService } from "../../services";
import { Button, TextField } from "@material-ui/core";
import { SortableGrid } from "..";

import "./playlist-create.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState(null);
  const [trackToAdd, setTrackToAdd] = useState("");

  const createPlaylist = (evt) => {
    evt.preventDefault();
    playlistService.createPlaylist(title, tracks).then((playlist) => {
      console.log("playlist: ", playlist);
      // navigate to newly created playlist
    });
  };

  const addTrack = async (evt) => {
    evt.preventDefault();
    const thumbnailUrl = await thumbnailService.getThumbnailURL(trackToAdd);
    setTrackToAdd("");
    setTracks([...tracks, { url: trackToAdd, thumbnailUrl }]);
  };

  return (
    <div className="playlist-create-container">
      <div className="playlist-create-inputs-container">
        <div className="input-container playlist-create-input-container">
          <TextField
            onKeyDown={(evt) => evt.key === "Enter" && addTrack(evt)}
            placeholder="Paste link to media here"
            value={trackToAdd}
            className="message-input"
            onChange={(evt) => setTrackToAdd(evt.target.value)}
            autoFocus
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <Button
            className="standard-submit-button"
            onClick={(evt) => addTrack(evt)}
            variant="contained"
          >
            Add Track
          </Button>
        </div>
        <div className="input-container playlist-create-input-container">
          <TextField
            onKeyDown={(evt) => evt.key === "Enter" && createPlaylist(evt)}
            placeholder="Enter your playlist title here"
            value={trackToAdd}
            className="message-input"
            onChange={(evt) => setTitle(evt.target.value)}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <Button
            className="standard-submit-button"
            onClick={(evt) => createPlaylist(evt)}
            variant="contained"
          >
            Create
          </Button>
        </div>
      </div>
      <SortableGrid tracks={tracks} setTracks={setTracks} />
    </div>
  );
}
