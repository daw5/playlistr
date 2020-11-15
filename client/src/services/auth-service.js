const axios = require("axios");

export const logout = () =>
  axios
    .post("/api/auth/logout")
    .then(() => {
      return true;
    })
    .catch(function () {
      return false;
    });

export const login = (email, password) =>
  axios
    .post(`/api/auth/login`, {
      email,
      password,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });

export const register = (email, password) =>
  axios
    .post(`/api/auth/register`, {
      email,
      password,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
