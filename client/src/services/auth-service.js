const axios = require("axios");

export default class AuthService {
  logout = () =>
    axios
      .post("/api/auth/logout")
      .then((response) => {
        console.log("response: ", response);
        return true;
      })
      .catch(function (error) {
        console.log(error);
      });

  login = (email, password) =>
    axios
      .post(`/api/auth/login`, {
        email,
        password,
      })
      .then(function (response) {
        console.log("authenticated: ", response);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
}
