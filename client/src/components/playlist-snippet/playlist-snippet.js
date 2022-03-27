import React from "react";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import DefaultThumbnail from "../../assets/cassette.gif";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useHistory } from "react-router-dom";
import "./playlist-snippet.scss";

export default function PlaylistSnippet(props) {
  const history = useHistory();

  const play = (playlist, track) => {
    if (track) {
      history.push(`/playlist/${playlist._id}?track=${track}`);
    } else {
      history.push(`/playlist/${playlist._id}`);
    }
  };

  const edit = (playlist) => {
    history.push(`/playlist-edit/${playlist._id}`);
  };

  return (
    <div className={`playlist-snippet`}>
      <div className={`playlist-head`}>
        <div className="playlist-functions-container">
          <div className="button-buffer">
            <Button
              className={`neon`}
              variant="contained"
              style={{ gridColumn: !props.userPlaylist && "1 / span 2" }}
              onClick={() => play(props.playlist)}
            >
              {props.playlist.title}
              <PlayArrowIcon></PlayArrowIcon>
            </Button>
            {props.userPlaylist && (
              <Button
                className={`edit-button`}
                variant="contained"
                onClick={() => edit(props.playlist)}
              >
                Edit
              </Button>
            )}
          </div>
          <div className="gradient"></div>
          <div className="spotlight"></div>
        </div>
      </div>
      <div className={`playlist-body`}>
        {props.playlist.tracks.map((track, index) => (
          <div
            onClick={() => play(props.playlist, index)}
            key={`track${index}`}
            className="my-playlists-thumbnail"
          >
            <img
              src={track.thumbnailUrl ? track.thumbnailUrl : DefaultThumbnail}
              className="track-preview"
            />
          </div>
        ))}
      </div>
      {props.userPlaylist && (
        <Button
          className="delete-playlist-button"
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => props.openDeleteModal(props.playlist)}
        >
          <ClearIcon fontSize="small" />
        </Button>
      )}
    </div>
  );
}
