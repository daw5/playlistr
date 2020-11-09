import React from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router-dom";
import "../header/header.scss";

export default function PlaylistSearchBar(props) {
  const history = useHistory();

  return (
    <div className="playlist-search-bar-container">
      <Autocomplete
        size="small"
        className="playlist-search-bar"
        options={props.playlists || []}
        onChange={(evt, playlist) => {
          history.push(`/playlist/${playlist._id}`);
        }}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                style: { color: "#fff" },
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
