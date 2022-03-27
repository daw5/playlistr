import React, { useEffect, useState } from "react";
import { playlistService } from "../../services";
import { PlaylistSnippet } from "..";
import { GeneralModal } from "..";
import "./playlists.scss";

export default function Playlists(props) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flaming, setFlaming] = useState(false);
  const [playlistToDelete, setPlaylistToDelete] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    props.socket ? getActivePlaylists() : getPlaylists();
    setLoading(true);
    return () => {
      setPlaylists([]);
    };
  }, [props.socket]);

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
          <PlaylistSnippet
            key={`playlist${index}`}
            playlist={playlist}
            userPlaylist={!props.socket}
            openDeleteModal={openDeleteModal}
          />
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
