import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { theme } from "../../material-overrides/header";
import "../header/header.scss";

export default function PlaylistSearchBar(props) {
  const playlistSearchStyles = makeStyles((theme) => ({
    root: {
      color: "white",
    },
  }));

  const playlistSearchClasses = playlistSearchStyles();

  return (
    <div className="playlist-search-bar-container">
      <Autocomplete
        size="small"
        className="playlist-search-bar"
        options={props.playlists || []}
        onChange={(evt, playlist) => {
          props.setPlaylist(playlist);
        }}
        getOptionLabel={(option) => option.email}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{ classes: playlistSearchClasses }}
            label="Search for a playlist"
            variant="outlined"
          />
        )}
      />
    </div>
  );
}
