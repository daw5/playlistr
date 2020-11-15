import React, { useState, useEffect } from "react";
import { useToggle } from "./hooks";
import {
  Playlist,
  Playlists,
  PlaylistCreate,
  Messaging,
  Header,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { messagingService, userService, playlistService } from "./services";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./material-overrides/header";
import "./App.scss";

export default function App() {
  const [messagingSidebarStatus, setMessagingSidebarStatus] = useToggle();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState({});
  const [socket, setSocket] = useState(null);
  const [recentPlaylists, setRecentPlaylists] = useState([]);
  const [loaded, setLoaded] = useState(false);
  // load 1000 most popular and 1000 most recent playlists. Search bar will use these.
  // in addition, will display most recent and most popular on home page

  useEffect(() => {
    loadRecentPlaylists();
    loadUserData();
  }, []);

  const loadUserData = () => {
    userService.getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
      } else {
        setAnonymousUser();
      }
      setLoaded(true);
    });
  };

  const setAnonymousUser = () => {
    setCurrentUser(null);
    setSocket(messagingService.connectSocket());
  };

  const setUser = (user) => {
    setCurrentUser(user);
    setSocket(messagingService.authenticateSocket());
    userService.getUsers().then((users) => {
      setUsers(users);
    });
  };

  const loadRecentPlaylists = () => {
    playlistService.getRecentPlaylists().then((playlists) => {
      setRecentPlaylists(playlists);
    });
  };

  return (
    <HelmetProvider>
      <div id="app">
        <Helmet>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Helmet>
        <ThemeProvider theme={theme}>
          <Router>
            <Header
              messagingSidebarOpen={messagingSidebarStatus}
              toggleMessagingSidebar={setMessagingSidebarStatus}
              playlists={recentPlaylists}
              loaded={loaded}
              loadUserData={loadUserData}
              currentUser={currentUser}
            ></Header>
            <div id="main-section-container">
              <div
                id="main-section"
                className={
                  messagingSidebarStatus ? "mobile-main-section" : undefined
                }
              >
                <Switch>
                  <Route
                    path="/my-playlists"
                    render={() => <Playlists />}
                  ></Route>
                  <Route
                    path="/playlist/:id"
                    render={(props) =>
                      socket && (
                        <Playlist
                          {...props}
                          currentUser={currentUser}
                          socket={socket}
                        />
                      )
                    }
                  ></Route>
                  <Route
                    path="/playlist-edit/:id"
                    render={(props) =>
                      currentUser && <PlaylistCreate {...props} edit={true} />
                    }
                  ></Route>
                  <Route
                    path="/playlist-create"
                    render={() => <PlaylistCreate edit={false} />}
                  ></Route>
                  <Route
                    path="/"
                    render={() => socket && <Playlists socket={socket} />}
                  ></Route>
                </Switch>
              </div>
              {socket && currentUser && (
                <Messaging
                  users={users}
                  socket={socket}
                  currentUser={currentUser}
                  messagingSidebarOpen={messagingSidebarStatus}
                />
              )}
            </div>
          </Router>
        </ThemeProvider>
      </div>
    </HelmetProvider>
  );
}
