import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { playlistService, thumbnailService } from "../../services";
import { Button, TextField } from "@material-ui/core";
import { SortableGrid } from "..";

import "./playlist-create.scss";

require("dotenv").config();

export default function Playlist(props) {
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState(null);
  const [errors, setErrors] = useState({ title: null, tracks: null });
  const [trackToAdd, setTrackToAdd] = useState(null);
  const history = useHistory();

  useEffect(() => {
    props.action === "edit" &&
      playlistService.getPlaylist(props.match.params.id).then((playlist) => {
        setTracks(playlist.tracks);
      });
  }, []);

  const createPlaylist = (evt) => {
    evt.preventDefault();
    if (tracks.length > 0) {
      playlistService.createPlaylist(title, tracks).then((playlist) => {
        playlist.errors
          ? setErrors({ title: playlist.errors.title })
          : playlist && history.push(`/playlist/${playlist._id}`);
      });
    } else {
      setErrors({ tracks: "Add some tracks!" });
    }
  };

  const addTrack = async (evt) => {
    evt.preventDefault();
    if (ReactPlayer.canPlay(trackToAdd)) {
      const thumbnailUrl = await thumbnailService.getThumbnailURL(trackToAdd);
      setTracks([...tracks, { url: trackToAdd, thumbnailUrl }]);
      setTrackToAdd("");
      errors.tracks && setErrors({ tracks: null });
    } else {
      setErrors({ tracks: "Cannot add track" });
    }
  };

  const deleteTrack = (index) => {
    tracks.splice(index, 1) && setTracks([...tracks]);
  };

  return (
    <div className="playlist-create-container">
      {props.playlist === "create" && (
        <div className="playlist-create-inputs-container">
          <div className="input-container playlist-create-input-container">
            <TextField
              onKeyDown={(evt) => evt.key === "Enter" && addTrack(evt)}
              placeholder="Paste link to media here"
              value={trackToAdd || ""}
              error={errors.tracks}
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
              error={errors.title}
              value={title || ""}
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
      )}
      <SortableGrid
        tracks={tracks}
        setTracks={setTracks}
        deleteTrack={deleteTrack}
      />
    </div>
  );
}
