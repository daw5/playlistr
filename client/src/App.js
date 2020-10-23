import React, { Component } from "react";
import { Login, Messaging, Header } from "./components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SocketService } from "./services";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messagingSidebarOpen: false,
    };

    this.socketService = new SocketService();
  }

  componentDidMount() {
    this.socketService.authenticateSocket();
  }

  toggleMessagingSidebar = () => {
    this.setState({
      messagingSidebarOpen: !this.state.messagingSidebarOpen,
    });
  };

  render() {
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
            messagingSidebarOpen={this.state.messagingSidebarOpen}
            toggleMessagingSidebar={this.toggleMessagingSidebar}
          ></Header>
          <div id="main-section-container">
            <Router>
              <Switch>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </Router>
            <Messaging messagingSidebarOpen={this.state.messagingSidebarOpen} />
          </div>
        </div>
      </HelmetProvider>
    );
  }
}

export default App;
