import React from "react";
import "./App.scss";
import { Login, Messaging } from "./components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocketService } from "./services";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const socketService = new SocketService();
  socketService.authenticateSocket();

  return (
    <HelmetProvider>
      <div id="app">
        <Router>
          <div>
            <Helmet>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width"
              />
            </Helmet>
            <div>
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
            </div>
          </div>
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
    </HelmetProvider>
  );
}

export default App;
