require("dotenv").config();

const axios = require("axios");

export const createPlaylist = (title, tracks) =>
  axios
    .post(`/api/playlists`, {
      title,
      tracks,
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("catch block");
      return error.response.data;
    });

export const getPlaylists = () =>
  axios
    .get(`/api/playlists`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });

export const getPlaylist = (playlistId) =>
  axios
    .get(`/api/playlists/${playlistId}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });

export const getRecentPlaylists = () =>
  axios
    .get(`/api/playlists/recent`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response;
    });
