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

  useEffect(() => {
    console.log("i really only want this running once");
    const messagingService = new MessagingService();
    setSocket(messagingService.authenticateSocket());
    const userService = new UserService();
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
