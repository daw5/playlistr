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
      return error.response.data;
    });

export const updatePlaylist = (playlistId, playlistUpdates) =>
  axios
    .put(`/api/playlists/${playlistId}`, playlistUpdates)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });

export const deletePlaylist = (playlistId) =>
  axios
    .delete(`/api/playlists/${playlistId}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });

export const getPlaylists = () =>
  axios
    .get(`/api/playlists`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });

export const getActivePlaylists = (data) =>
  axios
    .post(`/api/playlists/active`, data.slice(0, 50))
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });

export const getUserPlaylists = () =>
  axios
    .get(`/api/users/current/playlists`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });

export const getPlaylist = (playlistId) =>
  axios
    .get(`/api/playlists/${playlistId}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });

export const getRecentPlaylists = () =>
  axios
    .get(`/api/playlists/recent`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error.response.data;
    });
