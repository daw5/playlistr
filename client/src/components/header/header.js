import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
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
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

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
      <div>
        {props.loaded && props.currentUser ? (
          <SideMenu
            id="sideMenuIconContainer"
            setCurrentUser={props.setCurrentUser}
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
      {showLoginInputs && (
        <div id="loginInputs">
          <ThemeProvider theme={theme}>
            <TextField
              value={loginInput.email}
              className={"loginInput"}
              size="small"
              onChange={(evt) => setLoginInput({ email: evt.target.value })}
              variant="outlined"
              placeholder="Email"
              InputProps={{ classes: authInput }}
              multiline
            />
            <TextField
              value={loginInput.password}
              className={"loginInput"}
              size="small"
              onChange={(evt) => setLoginInput({ password: evt.target.value })}
              variant="outlined"
              placeholder="Password"
              InputProps={{ classes: authInput }}
              multiline
            />
            {showRegisterInputs && (
              <TextField
                value={loginInput.passwordConfirm}
                className={"loginInput"}
                size="small"
                onChange={(evt) =>
                  setLoginInput({ passwordConfirm: evt.target.value })
                }
                variant="outlined"
                placeholder="Confirm Password"
                InputProps={{ classes: authInput }}
                multiline
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
            <Button variant="outlined" className={"submit"}>
              <ChevronRightIcon fontSize="large" />
            </Button>
            <Button variant="outlined" className={"close"}>
              <CloseIcon fontSize="medium" />
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
