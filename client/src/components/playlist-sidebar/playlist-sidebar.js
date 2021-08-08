import React, { useState, useEffect } from "react";
import "./playlist-sidebar.scss";

require("dotenv").config();

export default function PlaylistSidebar(props) {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    console.log("yah");
  });

  return <div className="playlist-sidebar"></div>;
}
