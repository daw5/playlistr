import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { playlistService } from "../../services";
import Button from "@material-ui/core/Button";
import DefaultThumbnail from "../../assets/cassette.gif";
import "./my-playlists.scss";

export default function MyPlaylists(props) {
  const [playlists, setPlaylists] = useState([]);
  const history = useHistory();

  const play = (playlist) => {
    history.push(`/playlist/${playlist._id}`);
  };

  const edit = (playlist) => {
    history.push(`/playlist-edit/${playlist._id}`);
  };

  useEffect(() => {
    playlistService.getUserPlaylists().then((playlists) => {
      setPlaylists(playlists);
    });
  }, []);

  return (
    <div className="my-playlists-container">
      {playlists &&
        playlists.map((playlist, index) => (
          <div key={`playlist${index}`} className="playlist">
            <div className="playlist-head">
              <div className="playlist-title-container">
                <h2>{playlist.title}</h2>
              </div>
              <div className="playlist-functions-container">
                <Button
                  className="playlist-play-button standard-submit-button"
                  variant="contained"
                  onClick={() => play(playlist)}
                >
                  Play
                </Button>
                <Button
                  className="playlist-edit-button standard-submit-button"
                  variant="contained"
                  onClick={() => edit(playlist)}
                >
                  Edit
                </Button>
              </div>
            </div>
            <div className="playlist-body">
              {playlist.tracks.map((track, index) => (
                <div key={`track${index}`} className="my-playlists-thumbnail">
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
