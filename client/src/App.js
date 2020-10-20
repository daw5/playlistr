import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login, Messaging } from "./components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocketService } from "./services";

function App() {
  const socketService = new SocketService();
  socketService.authenticateSocket();

  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/messaging">Messaging</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/messaging">
            <Messaging />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
