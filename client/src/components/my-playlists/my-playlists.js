import React, { useEffect, useState } from "react";
import { playlistService } from "../../services";
import Button from "@material-ui/core/Button";
import "./my-playlists.scss";
import DefaultThumbnail from "../../assets/cassette.gif";

export default function MyPlaylists(props) {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    playlistService.getUserPlaylists().then((playlists) => {
      setPlaylists(playlists);
    });
  }, []);
  return (
    <div className="my-playlists-container">
      {playlists &&
        playlists.map((playlist) => (
          <div className="playlist">
            <div className="playlist-head">
              <div className="playlist-title-container">
                <h2>{playlist.title}</h2>
              </div>
              <div className="playlist-functions-container">
                <Button
                  className="playlist-play-button standard-submit-button"
                  variant="contained"
                >
                  Play
                </Button>
                <Button
                  className="playlist-edit-button standard-submit-button"
                  variant="contained"
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="playlist-body">
              {playlist.tracks.map((track, index) => (
                <div className="my-playlists-thumbnail">
                  <img
                    src={
                      track.thumbnailUrl ? track.thumbnailUrl : DefaultThumbnail
                    }
                    className="track-preview"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
