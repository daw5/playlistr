import React, { useState, useEffect } from "react";
import { useToggle } from "./hooks";
import { Login, Messaging, Header } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MessagingService, UserService } from "./services";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.scss";

export default function App() {
  const [messagingSidebarStatus, setMessagingSidebarStatus] = useToggle();
  const [users, setUsers] = useState({});
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const messagingService = new MessagingService();
    const userService = new UserService();
    userService.getCurrentUser().then((user) => {
      setCurrentUser(user);
      setSocket(messagingService.authenticateSocket());
      setLoaded(true);
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
          currentUser={currentUser}
          loaded={loaded}
          setCurrentUser={setCurrentUser}
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
              socket={socket}
              currentUser={currentUser}
              messagingSidebarOpen={messagingSidebarStatus}
            />
          )}
        </div>
      </div>
    </HelmetProvider>
  );
}
