import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { playlistService } from "../../services";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import DefaultThumbnail from "../../assets/cassette.gif";
import { GeneralModal } from "..";
import "./my-playlists.scss";

export default function MyPlaylists(props) {
  const [playlists, setPlaylists] = useState([]);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const history = useHistory();

  const play = (playlist) => {
    history.push(`/playlist/${playlist._id}`);
  };

  const edit = (playlist) => {
    history.push(`/playlist-edit/${playlist._id}`);
  };

  const openDeleteModal = (playlist) => {
    setPlaylistToDelete(playlist);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setPlaylistToDelete(null);
    setDeleteModalOpen(false);
  };

  const deletePlaylist = (playlist) => {
    // use service to delete playlist then run:
    setPlaylistToDelete(null);
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
            <Button
              className="delete-playlist-button"
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => openDeleteModal(playlist)}
            >
              <ClearIcon fontSize="small" />
            </Button>
          </div>
        ))}
      <GeneralModal
        action={deletePlaylist}
        content="Blah dee fucking blah"
        open={deleteModalOpen}
        handleClose={closeDeleteModal}
        item={playlistToDelete && playlistToDelete}
      />
    </div>
  );
}
