import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { playlistService } from "../../services";
import { GeneralModal } from "..";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import DefaultThumbnail from "../../assets/cassette.gif";
import "./playlists.scss";
const Marquee = require("react-marquee");

export default function Playlists(props) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flaming, setFlaming] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    props.socket ? getActivePlaylists() : getPlaylists();
    setLoading(true);
  }, [props.socket]);

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
    setFlaming(true);
    props.socket.on("get-active-playlists", function (data) {
      const uniquePlaylists = [
        ...new Map(data.map((playlist) => [playlist._id, playlist])).values(),
      ];
      setPlaylists([...uniquePlaylists]);
      setTimeout(() => {
        setFlaming(false);
      }, 4999);
      setLoading(false);
    });
    props.socket.emit("get-active-playlists", true);
  };

  return (
    <div
      className={`playlists-container ${flaming ? "hot" : undefined} ${
        !loading ? "fade-out" : undefined
      }`}
    >
      {playlists &&
        playlists.map((playlist, index) => (
          <div key={`playlist${index}`} className={`playlist`}>
            <div className="playlist-head">
              <div className={`playlist-title-container`}>
                <Marquee
                  className="playlist-title"
                  text={playlist.title + "wekfjnwekfjnwkjdnskjfw kjwnefkjwnef"}
                  hoverToStop={true}
                  loop={true}
                />
              </div>
              <div className="playlist-functions-container">
                <Button
                  className={`standard-submit-button ${props.socket && "hot"}`}
                  variant="contained"
                  style={{ gridColumn: props.socket && "1 / span 2" }}
                  onClick={() => play(playlist)}
                >
                  Play
                </Button>
                {!props.socket && (
                  <Button
                    className="standard-submit-button"
                    variant="contained"
                    onClick={() => edit(playlist)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </div>
            <div className={`playlist-body`}>
              {playlist.tracks.map((track, index) => (
                <div
                  onClick={() => play(playlist, index + 1)}
                  key={`track${index}`}
                  className="my-playlists-thumbnail"
                >
                  <img
                    src={
                      track.thumbnailUrl ? track.thumbnailUrl : DefaultThumbnail
                    }
                    className="track-preview"
                  />
                </div>
              ))}
            </div>
            {!props.socket && (
              <Button
                className="delete-playlist-button"
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => openDeleteModal(playlist)}
              >
                <ClearIcon fontSize="small" />
              </Button>
            )}
          </div>
        ))}
      {!playlists[0] && !props.socket && (
        <div className="no-playlists">
          <h2>No playlists here!</h2>
        </div>
      )}
      <GeneralModal
        action={deletePlaylist}
        open={deleteModalOpen}
        handleClose={closeDeleteModal}
        item={playlistToDelete && playlistToDelete}
      />
    </div>
  );
}
