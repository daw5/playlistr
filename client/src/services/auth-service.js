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
}
