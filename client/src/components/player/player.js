import React from "react";
import ReactPlayer from "react-player";
import "./player.scss";

require("dotenv").config();

const RE_FACEBOOK = /^\/[\w-]+\/videos\/(\d+)(\/)?$/;

export default function Player(props) {
  const isFacebookUrl = /^(?:(?:https?:)?\/\/)?(?:www\.)?facebook\.com\/[a-zA-Z0-9\.]+\/videos\/(?:[a-zA-Z0-9\.]+\/)?([0-9]+)/.test(
    props.currentTrack
  );
  return (
    <div className="player-wrapper">
      {props.currentTrack ? (
        <ReactPlayer
          className={!isFacebookUrl ? "react-player" : "facebook-react-player"}
          url={props.currentTrack}
          width={!isFacebookUrl ? "100%" : "calc(50% - 46px)"}
          height={"100%"}
          controls={true}
          onEnded={props.trackForward}
          playing={true}
        />
      ) : (
        <h2 style={{ color: "white", margin: "auto", textAlign: "center" }}>
          No Playlist Selected
        </h2>
      )}
    </div>
  );
}
