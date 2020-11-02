const axios = require("axios");

export default class AuthService {
  logout = () =>
    axios
      .post("/api/auth/logout")
      .then(() => {
        return true;
      })
      .catch(function () {
        return false;
      });

  login = (email, password) =>
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

  register = (email, password) =>
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
}
