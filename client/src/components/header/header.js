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
  Typography,
} from "@material-ui/core";
import "./header.scss";

function Header(props) {
  const [showLoginInputs, setShowLoginInputs] = useState(false);
  const [showRegisterInputs, setShowRegisterInputs] = useState(false);
  const [authService, setAuthService] = useState(null);
  const [temporaryMessage, setTemporaryMessage] = useState("");
  const defaultAuthInput = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [authInput, setAuthInput] = useState(defaultAuthInput);

  useEffect(() => {
    setAuthService(new AuthService());
  }, []);

  const resetHeader = () => {
    setAuthInput(defaultAuthInput);
    setShowRegisterInputs(false);
    setShowLoginInputs(false);
  };

  const handleLogin = () => {
    authService.login(authInput.email, authInput.password).then((response) => {
      if (response.status === 200) {
        resetHeader();
        displayTemporaryMessage("WELCOME");
        props.loadUserData();
      } else {
        handleAuthResponse(response);
      }
    });
  };

  const handleRegister = () => {
    authInput.passwordConfirm === authInput.password
      ? authService
          .register(authInput.email, authInput.password)
          .then((response) => {
            handleAuthResponse(response);
            response.status === 200 && resetHeader();
          })
      : displayTemporaryMessage("PASSWORDS DO NOT MATCH");
  };

  const handleAuthResponse = (response) => {
    const message = Object.values(response.data)[0]
      ? Object.values(response.data)[0].msg
      : response.data;
    displayTemporaryMessage(message.toUpperCase());
  };

  const displayTemporaryMessage = (message) => {
    setTemporaryMessage(message);
    setTimeout(() => {
      setTemporaryMessage(null);
    }, 2000);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#fff",
      },
    },
  });

  const authInputStyles = makeStyles((theme) => ({
    root: {
      border: "1px solid white",
      color: "white",
    },
  }));

  const authInputClasses = authInputStyles();

  return (
    <div id="header" className={temporaryMessage && "animate-header"}>
      {temporaryMessage && (
        <Typography className={"temporaryMessage"} variant="h5">
          {temporaryMessage}
        </Typography>
      )}
      {props.loaded && !temporaryMessage && (
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
      {showLoginInputs && !temporaryMessage && (
        <div id="authInputs">
          <ThemeProvider theme={theme}>
            <TextField
              value={authInput.email}
              className={"authInput"}
              size="small"
              onChange={(evt) =>
                setAuthInput({ ...authInput, email: evt.target.value })
              }
              variant="outlined"
              placeholder="Email"
              InputProps={{ classes: authInputClasses }}
            />
            <TextField
              type="password"
              value={authInput.password}
              className={"authInput"}
              size="small"
              onChange={(evt) =>
                setAuthInput({ ...authInput, password: evt.target.value })
              }
              variant="outlined"
              placeholder="Password"
              InputProps={{ classes: authInputClasses }}
            />
            {showRegisterInputs && (
              <TextField
                type="password"
                value={authInput.passwordConfirm}
                className={"authInput"}
                size="small"
                onChange={(evt) =>
                  setAuthInput({
                    ...authInput,
                    passwordConfirm: evt.target.value,
                  })
                }
                variant="outlined"
                placeholder="Confirm Password"
                InputProps={{ classes: authInputClasses }}
              />
            )}
            <div
              className={
                showRegisterInputs
                  ? "loginSubmitContainerRegister"
                  : "loginSubmitContainer"
              }
            >
              <Button
                onClick={!showRegisterInputs ? handleLogin : handleRegister}
                variant="outlined"
                className={"submit"}
              >
                <ChevronRightIcon fontSize="large" />
              </Button>
              <Button
                onClick={() => resetHeader()}
                variant="outlined"
                className={"close"}
              >
                <CloseIcon fontSize="default" />
              </Button>
            </div>
          </ThemeProvider>
        </div>
      )}
      {props.currentUser && !temporaryMessage && (
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
