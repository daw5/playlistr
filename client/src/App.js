import React, { useState, useEffect } from "react";
import { useToggle } from "./hooks";
import { Login, Messaging, Header } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MessagingService, UserService } from "./services";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.scss";

export default function App() {
  const messagingService = new MessagingService();
  const userService = new UserService();
  const [messagingSidebarStatus, setMessagingSidebarStatus] = useToggle();
  const [users, setUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [latestMessage, setLatestMessage] = useState();

  useEffect(() => {
    messagingService.authenticateSocket(setLatestMessage);
  }, [latestMessage]);

  useEffect(() => {
    userService.getCurrentUser().then((user) => {
      setCurrentUser(user);
    });
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
          {currentUser && (
            <Messaging
              users={users}
              latestMessage={latestMessage}
              currentUser={currentUser}
              messagingSidebarOpen={messagingSidebarStatus}
            />
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}
