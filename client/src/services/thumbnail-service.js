import { parse } from "url";
const axios = require("axios");

//extract id from url path
const RE_VIMEO = /^(?:\/video|\/channels\/[\w-]+|\/groups\/[\w-]+\/videos)?\/(\d+)$/;
const RE_YOUTUBE = /^(?:\/embed)?\/([\w-]{10,12})$/;
const RE_FACEBOOK = /^\/[\w-]+\/videos\/(\d+)(\/)?$/;

export const getThumbnailURL = (url) => {
  url = url || "";

  const urlobj = parse(url, true);

  //youtube
  if (
    ["www.youtube.com", "youtube.com", "youtu.be"].indexOf(urlobj.host) !== -1
  ) {
    let video_id = null;
    if ("v" in urlobj.query) {
      if (urlobj.query.v && urlobj.query.v.match(/^[\w-]{10,12}$/)) {
        video_id = urlobj.query.v;
      }
    } else {
      const match = RE_YOUTUBE.exec(urlobj.pathname);
      if (match) {
        video_id = match[1];
      }
    }

    if (video_id) {
      return `http://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
    }
  }

  //vimeo
  if (
    ["www.vimeo.com", "vimeo.com", "player.vimeo.com"].indexOf(urlobj.host) !==
    -1
  ) {
    const match = RE_VIMEO.exec(urlobj.pathname);
    if (match) {
      const video_id = match[1];
      return axios
        .get(`https://vimeo.com/api/v2/video/${video_id}.json`)
        .then((res) => {
          return res.data[0].thumbnail_large;
        })
        .catch(function () {
          return false;
        });
    }
  }

  //facebook
  if (["facebook.com", "www.facebook.com"].indexOf(urlobj.host) !== -1) {
    const match = RE_FACEBOOK.exec(urlobj.pathname);

    if (match) {
      const video_id = match[1];
      return axios
        .get(`https://graph.facebook.com/${video_id}`)
        .then((res) => {
          console.log("response: ", res);
          if (res) {
            return res.picture;
          }
        })
        .catch(function () {
          return false;
        });
    }
  }
  return null;
};