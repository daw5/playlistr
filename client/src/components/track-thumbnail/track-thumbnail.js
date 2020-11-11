import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import "./track-thumbnail.scss";

export default function TrackThumbnail(props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="sortable-item"
    >
      <img
        src={props.thumbnailUrl}
        className={`track-preview 
          ${hovered && "low-opacity"}`}
      />
      {hovered && (
        <Button
          className="track-remove-button"
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
      <Button
        variant="contained"
        color="secondary"
        className="track-remove-button-mobile"
      >
        Delete
      </Button>
    </div>
  );
}
