import React, { useState, useEffect } from "react";
import { useToggle } from "./hooks";
import { Login, Messaging, Header } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SocketService, UserService } from "./services";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.scss";

export default function App() {
  const socketService = new SocketService();
  const userService = new UserService();
  const [messagingSidebarStatus, setMessagingSidebarStatus] = useToggle();
  const [users, setUsers] = useState({});

  useEffect(() => {
    socketService.authenticateSocket();
    userService.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <HelmetProvider>
      <div id="app">
        <Helmet>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Helmet>
        <Header
          messagingSidebarOpen={messagingSidebarStatus}
          toggleMessagingSidebar={setMessagingSidebarStatus}
        ></Header>
        <div id="main-section-container">
          <Router>
            <Switch>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </Router>
          <Messaging
            users={users}
            messagingSidebarOpen={messagingSidebarStatus}
          />
        </div>
      </div>
    </HelmetProvider>
  );
}
