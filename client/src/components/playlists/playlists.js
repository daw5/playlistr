import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { playlistService } from "../../services";
import { GeneralModal } from "..";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import DefaultThumbnail from "../../assets/cassette.gif";
import "./my-playlists.scss";

export default function Playlists(props) {
  const [playlists, setPlaylists] = useState([]);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    props.socket ? getActivePlaylists() : getPlaylists();
  }, []);

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
    // consider making optimistic update in future...maybe index playlists on arrival for easy delete?
    playlistService.deletePlaylist(playlist._id).then(() => {
      getPlaylists();
      closeDeleteModal();
    });
    setPlaylistToDelete(null);
  };

  const getPlaylists = () => {
    playlistService.getUserPlaylists().then((playlists) => {
      setPlaylists(playlists);
    });
  };

  const getActivePlaylists = () => {
    props.socket.on("get-active-playlists", function (data) {
      setPlaylists([...data]);
    });
    props.socket.emit("get-active-playlists", true);
  };

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
        open={deleteModalOpen}
        handleClose={closeDeleteModal}
        item={playlistToDelete && playlistToDelete}
      />
    </div>
  );
}
