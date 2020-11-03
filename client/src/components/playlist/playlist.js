import React, { useState, useRef, useEffect } from "react";

import "./playlist.scss";

require("dotenv").config();

export default function Playlist(props) {
  console.log("isauthed: ", props);
  return <div>Hello I'm playlist</div>;
}
