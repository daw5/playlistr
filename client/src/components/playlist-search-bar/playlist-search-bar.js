import React, { useState, useEffect } from "react";
import { playlistService } from "../../services";
import { TextField } from "@material-ui/core";
import "../header/header.scss";

export default function PlaylistSearchBar(props) {
  const [waitForInputToStop, setWaitForInputToStop] = useState(false);

  const handleInput = (value) => {
    clearTimeout(waitForInputToStop);
    const timeout = setTimeout(() => {
      value.length > 1 && playlistService.getPlaylists(value);
    }, 1000);
    setWaitForInputToStop(timeout);
  };

  return (
    <div className="playlist-search-bar-container">
      <TextField
        fullWidth={true}
        size="small"
        InputProps={{
          style: { color: "#fff" },
        }}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        onChange={(evt) => handleInput(evt.target.value)}
        label="Search for a playlist"
        variant="outlined"
      />
    </div>
  );
}
