import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { playlistService, trackDetailsService } from "../../services";
import { detectHostUrl } from "../../helpers/urlPatterns";
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
    props.edit &&
      playlistService.getPlaylist(props.match.params.id).then((playlist) => {
        setTracks(playlist.tracks);
        setTitle(playlist.title);
      });
  }, []);

  const saveChanges = () => {
    playlistService
      .updatePlaylist(props.match.params.id, { title, tracks })
      .then((playlist) => {
        playlist.errors
          ? setErrors(playlist.errors)
          : history.push("/my-playlists");
      });
  };

  const createPlaylist = (evt) => {
    evt.preventDefault();
    if (tracks.length > 0) {
      playlistService.createPlaylist(title, tracks).then((playlist) => {
        playlist.errors
          ? setErrors(playlist.errors)
          : playlist && history.push(`/playlist/${playlist._id}`);
      });
    } else {
      setErrors({ tracks: "Add some tracks!" });
    }
  };

  const addTrack = async (evt) => {
    evt.preventDefault();
    if (ReactPlayer.canPlay(trackToAdd)) {
      const thumbnailUrl = await trackDetailsService.getThumbnailURL(
        trackToAdd
      );
      createTrack(trackToAdd, thumbnailUrl);
    } else if (detectHostUrl.bitchute(trackToAdd)) {
      const { embedUrl, thumbnailUrl } =
        await trackDetailsService.getTrackDetails("bitchute", trackToAdd);
      createTrack(embedUrl, thumbnailUrl);
    } else if (detectHostUrl.rumble(trackToAdd)) {
      const { embedUrl, thumbnailUrl } =
        await trackDetailsService.getTrackDetails("rumble", trackToAdd);
      createTrack(embedUrl, thumbnailUrl);
    } else if (detectHostUrl.odysee(trackToAdd)) {
      // odysee regex needs updating
      setErrors({ tracks: "Cannot add track" });
      // const { embedUrl, thumbnailUrl } =
      //   await trackDetailsService.getTrackDetails("odysee", trackToAdd);
      // createTrack(embedUrl, thumbnailUrl);
    } else if (detectHostUrl.brandNewTube(trackToAdd)) {
      const { embedUrl, thumbnailUrl } =
        await trackDetailsService.getTrackDetails("brandnewtube", trackToAdd);
      createTrack(embedUrl, thumbnailUrl);
    } else {
      setErrors({ tracks: "Cannot add track" });
    }
  };

  const createTrack = async (track, thumbnailUrl) => {
    setTracks([...tracks, { url: track, thumbnailUrl }]);
    setTrackToAdd("");
    errors.tracks && setErrors({ tracks: null });
  };

  const deleteTrack = (index) => {
    tracks.splice(index, 1) && setTracks([...tracks]);
  };

  return (
    <div className="playlist-create-container">
      <div className="playlist-create-inputs-container">
        <div
          className={`playlist-create-input-container ${
            props.edit && "edit-inputs-container"
          }`}
        >
          <div className="add-track-input-container">
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
            <div class="gradient"></div>
            <div class="spotlight"></div>
          </div>
          <div className="playlist-create-button-container">
            <Button onClick={(evt) => addTrack(evt)} variant="contained">
              Add Track
            </Button>
            <div class="gradient"></div>
            <div class="spotlight"></div>
          </div>
        </div>
        <div
          className={`playlist-create-input-container ${
            props.edit && "edit-inputs-container"
          }`}
        >
          <div className="add-track-input-container">
            <TextField
              onKeyDown={(evt) => evt.key === "Enter" && createPlaylist(evt)}
              placeholder={
                !props.edit ? "Enter your playlist title here" : undefined
              }
              error={errors.title}
              value={title || ""}
              className="message-input"
              onChange={(evt) => setTitle(evt.target.value)}
              InputProps={{
                style: { color: "#fff" },
              }}
            />
            <div class="gradient"></div>
            <div class="spotlight"></div>
          </div>
          <div className="playlist-create-button-container">
            <Button
              onClick={(evt) => {
                props.edit ? saveChanges() : createPlaylist(evt);
              }}
              variant="contained"
            >
              {!props.edit ? "Create" : "Save Changes"}
            </Button>
            <div class="gradient"></div>
            <div class="spotlight"></div>
          </div>
        </div>
      </div>
      {tracks && (
        <SortableGrid
          tracks={tracks}
          setTracks={setTracks}
          deleteTrack={deleteTrack}
        />
      )}
    </div>
  );
}
