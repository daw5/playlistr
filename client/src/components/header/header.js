import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { AuthService } from "../../services";
import { SideMenu } from "..";
import {
  TextField,
  Button,
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import "./header.scss";

function Header(props) {
  const [showLoginInputs, setShowLoginInputs] = useState(false);
  const [showRegisterInputs, setShowRegisterInputs] = useState(false);
  const [authService, setAuthService] = useState(null);
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    setAuthService(new AuthService());
  }, []);

  const handleLogin = () => {
    authService
      .login(loginInput.email, loginInput.password)
      .then((loggedIn) => {
        if (loggedIn) {
          setShowLoginInputs(false);
          props.loadUserData();
        }
      });
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#fff",
      },
    },
  });

  const authInputs = makeStyles((theme) => ({
    root: {
      border: "1px solid white",
      overflow: "hidden",
      color: "white",
    },
  }));

  const authInput = authInputs();

  return (
    <div id="header">
      {props.loaded && (
        <div id="navButtonsContainer">
          {props.currentUser ? (
            <SideMenu
              id="sideMenuIconContainer"
              loadUserData={props.loadUserData}
            />
          ) : (
            <div id="loginButtonContainer">
              {!showLoginInputs || showRegisterInputs ? (
                <Button
                  id="loginButton"
                  onClick={() => {
                    setShowLoginInputs(true);
                    setShowRegisterInputs(false);
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  id="registerButton"
                  onClick={() => setShowRegisterInputs(true)}
                >
                  No Account?
                </Button>
              )}
            </div>
          )}
        </div>
      )}
      {showLoginInputs && (
        <div id="loginInputs">
          <ThemeProvider theme={theme}>
            <TextField
              value={loginInput.email}
              className={"loginInput"}
              size="small"
              onChange={(evt) =>
                setLoginInput({ ...loginInput, email: evt.target.value })
              }
              variant="outlined"
              placeholder="Email"
              InputProps={{ classes: authInput }}
              multiline
            />
            <TextField
              type="password"
              value={loginInput.password}
              className={"loginInput"}
              size="small"
              onChange={(evt) =>
                setLoginInput({ ...loginInput, password: evt.target.value })
              }
              variant="outlined"
              placeholder="Password"
              InputProps={{ classes: authInput }}
            />
            {showRegisterInputs && (
              <TextField
                type="password"
                value={loginInput.passwordConfirm}
                className={"loginInput"}
                size="small"
                onChange={(evt) =>
                  setLoginInput({
                    ...loginInput,
                    passwordConfirm: evt.target.value,
                  })
                }
                variant="outlined"
                placeholder="Confirm Password"
                InputProps={{ classes: authInput }}
              />
            )}
          </ThemeProvider>
          <div
            className={
              showRegisterInputs
                ? "loginSubmitContainerRegister"
                : "loginSubmitContainer"
            }
          >
            <Button
              onClick={handleLogin}
              variant="outlined"
              className={"submit"}
            >
              <ChevronRightIcon fontSize="large" />
            </Button>
            <Button
              onClick={() => {
                setShowLoginInputs(false);
                setShowRegisterInputs(false);
              }}
              variant="outlined"
              className={"close"}
            >
              <CloseIcon fontSize="default" />
            </Button>
          </div>
        </div>
      )}
      {props.currentUser && (
        <div id="messaging-icon-column">
          <div
            id="messaging-icon-container"
            onClick={props.toggleMessagingSidebar}
          >
            <ChatBubbleOutlineIcon
              id="messaging-icon-outline"
              style={{
                fontSize: 40,
              }}
              className={props.messagingSidebarOpen ? "hidden" : "visible"}
            ></ChatBubbleOutlineIcon>
            <ChatBubbleIcon
              id="messaging-icon-filled"
              style={{ fontSize: 40 }}
              className={props.messagingSidebarOpen ? "visible" : "hidden"}
            ></ChatBubbleIcon>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
