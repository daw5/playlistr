import React, { useState, useEffect } from "react";
import DefaultThumbnail from "../../assets/cassette.gif";
import "./playlist-sidebar-image.scss";

require("dotenv").config();

export default function PlaylistSidebarImage(props) {
  const [showHoverEffect, setShowHoverEffect] = useState(false);

  const toggleHoverEffect = (shouldHover) => {
    setShowHoverEffect(shouldHover);
  };

  const shouldShowHoverEffect = () => {
    if (props.nowPlaying || showHoverEffect) {
      return true;
    }
  };
  return (
    <React.Fragment>
      <img
        onMouseOver={() => toggleHoverEffect(true)}
        onMouseLeave={() => toggleHoverEffect(false)}
        className="playlist-sidebar-snippet-image"
        src={
          props.track.thumbnailUrl ? props.track.thumbnailUrl : DefaultThumbnail
        }
      />
      {shouldShowHoverEffect() && (
        <React.Fragment>
          <div className="spotlight"></div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
