require("dotenv").config();

const axios = require("axios");

export default class PlaylistService {
  createPlaylist = (title, urls) =>
    axios
      .post(`/api/playlists`, {
        title,
        urls,
      })
      .then(function (response) {
        console.log("response: ", response);
        return response;
      })
      .catch(function (error) {
        return error.response;
      });

  getPlaylists = () =>
    axios
      .get(`/api/playlists`)
      .then(function (response) {
        console.log("response: ", response);
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
}
