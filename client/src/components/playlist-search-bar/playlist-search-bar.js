import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import { theme } from "../../material-overrides/header";
import "../header/header.scss";

export default function PlaylistSearchBar(props) {
  const history = useHistory();

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
          history.push("/playlist");
        }}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                classes: playlistSearchClasses,
              }}
              label="Search for a playlist"
              variant="outlined"
            />
          );
        }}
      />
    </div>
  );
}
