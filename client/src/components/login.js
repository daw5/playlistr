import React, { Component } from "react";
require("dotenv").config();
const axios = require("axios");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  login = () => {
    const { email, password } = this.state;
    axios
      .post(`/api/auth/login`, {
        email,
        password,
      })
      .then(function (response) {
        console.log("authenticated");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange = (evt) => {
    console.log(process.env.API_URL);
    this.setState({ [evt.target.name]: evt.target.value }, () => {});
  };

  render() {
    return (
      <div>
        <p>Greetings Grasshoppah!</p>
        <button onClick={this.login}>Login</button>
        <input
          name="email"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Login;
