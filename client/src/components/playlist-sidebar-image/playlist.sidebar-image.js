import React, { useState, useEffect } from "react";
import DefaultThumbnail from "../../assets/cassette.gif";
import "./playlist-sidebar-image.scss";

require("dotenv").config();

export default function PlaylistSidebarImage(props) {
  const [showHoverEffect, setShowHoverEffect] = useState(false);

  const shouldShowHoverEffect = (shouldHover) => {
    setShowHoverEffect(shouldHover);
  };
  return (
    <React.Fragment>
      <img
        onMouseOver={() => shouldShowHoverEffect(true)}
        onMouseLeave={() => shouldShowHoverEffect(false)}
        className="playlist-sidebar-snippet-image"
        src={
          props.track.thumbnailUrl ? props.track.thumbnailUrl : DefaultThumbnail
        }
      />
      {showHoverEffect && (
        <React.Fragment>
          <div className="spotlight"></div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
