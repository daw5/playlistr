import { parse } from "url";
const axios = require("axios");

const RE_VIMEO_EMBED =
  /^(?:\/video|\/channels\/[\w-]+|\/groups\/[\w-]+\/videos)?\/(\d+)$/;
const RE_YOUTUBE_EMBED = /^(?:\/embed)?\/([\w-]{10,12})$/;

export const getThumbnailURL = (url) => {
  url = url || "";

  const urlobj = parse(url, true);

  // TODO support thumbnails for more video hosting

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
      const match = RE_YOUTUBE_EMBED.exec(urlobj.pathname);
      if (match) {
        video_id = match[1];
      }
    }

    if (video_id) {
      return `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
    }
  }

  //vimeo
  if (
    ["www.vimeo.com", "vimeo.com", "player.vimeo.com"].indexOf(urlobj.host) !==
    -1
  ) {
    const match = RE_VIMEO_EMBED.exec(urlobj.pathname);
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

  return null;
};

export const getTrackDetails = async (host, shareUrl) => {
  return axios
    .get(`/api/track-details`, {
      params: {
        host: encodeURIComponent(host),
        shareUrl: encodeURIComponent(shareUrl),
      },
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
};
