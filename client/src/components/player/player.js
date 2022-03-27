import React from "react";
import ReactPlayer from "react-player";
import { detectHostEmbedUrl } from "../../helpers/urlPatterns";
import "./player.scss";

require("dotenv").config();

export default function Player(props) {
  const isFacebookUrl = detectHostEmbedUrl.facebook(props.currentTrack);
  const isAltUrl =
    detectHostEmbedUrl.bitchute(props.currentTrack) ||
    detectHostEmbedUrl.rumble(props.currentTrack) ||
    detectHostEmbedUrl.odysee(props.currentTrack) ||
    detectHostEmbedUrl.brandNewTube(props.currentTrack);

  const player = () => {
    if (isAltUrl) {
      setTimeout(() => {
        props.setPlayerReady(true);
      }, 50);
      return (
        <iframe
          className="react-player alt-player"
          src={props.currentTrack}
        ></iframe>
      );
    } else {
      return (
        <ReactPlayer
          className={!isFacebookUrl ? "react-player" : "facebook-react-player"}
          url={props.currentTrack}
          width={!isFacebookUrl ? "100%" : "calc(50% - 46px)"}
          height={"100%"}
          controls={true}
          onEnded={props.trackForward}
          playing={true}
          onReady={() => props.setPlayerReady(true)}
        />
      );
    }
  };

  return (
    <div className="player-wrapper">
      {props.currentTrack ? (
        player()
      ) : (
        <h2 style={{ color: "white", margin: "auto", textAlign: "center" }}>
          No Playlist Selected
        </h2>
      )}
    </div>
  );
}
