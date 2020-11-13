import React, { useState } from "react";
import DefaultThumbnail from "../../assets/cassette.gif";
import "./track-thumbnail.scss";

export default function TrackThumbnail(props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="sortable-item"
    >
      {/* thumbnail */}
      <img
        src={props.thumbnailUrl ? props.thumbnailUrl : DefaultThumbnail}
        className={`track-preview 
          ${hovered && "low-opacity"}`}
      />
      {/* desktop delete button */}
      {hovered && (
        <button
          onClick={() => props.deleteTrack(props.index)}
          className="track-remove-button"
        >
          DELETE
        </button>
      )}
      {/* mobile delete button */}
      <button
        onClick={() => props.deleteTrack(props.index)}
        className="track-remove-button-mobile"
      >
        DELETE
      </button>
    </div>
  );
}
