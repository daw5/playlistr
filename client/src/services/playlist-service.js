require("dotenv").config();

const axios = require("axios");

export const createPlaylist = (title, urls) =>
  axios
    .post(`/api/playlists`, {
      title,
      urls,
    })
    .then(function (response) {
      console.log("response: ", response);
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });

export const getPlaylists = () =>
  axios
    .get(`/api/playlists`)
    .then(function (response) {
      console.log("response: ", response);
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });

export const getPlaylist = (playlistId) =>
  axios
    .get(`/api/playlists/${playlistId}`)
    .then(function (response) {
      console.log("response: ", response);
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });

export const getRecentPlaylists = () =>
  axios
    .get(`/api/playlists/recent`)
    .then(function (response) {
      console.log("response: ", response.data);
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });
