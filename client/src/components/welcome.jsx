import React, { Component } from 'react';
import io from "socket.io-client";
const socket = io();

class Welcome extends Component {
    componentDidMount() {
        // const {token} = sessionStorage;
        const socket = io.connect('http://localhost:4001');
        socket.on('connect', function () {
        socket.on('authenticated', function () {
            //do other things
            })
            .emit('authenticate', {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYXJjaG9uaXN0QHByb3Rvbm1haWwuY29tIiwiaWF0IjoxNjAyNjUzMjc5LCJleHAiOjE2MTI2NTMyNzl9.AbhrJ3xBh5u1cxcb9f-t0wxE_cF4yVmt6EIHqC0EnFU"}); //send the jwt
});
    }
    render() {
      return <h1>Hello, blah ekwef</h1>;
    }
}

export default Welcome;