import React, { useEffect, useState } from "react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { AuthService } from "../../services";
import { AuthInputs, PlaylistSearchBar, SideMenu } from "..";
import { Button, Typography } from "@material-ui/core";
import "./header.scss";

function Header(props) {
  const [showAuthInputs, setShowAuthInputs] = useState(false);
  const [showRegisterInputs, setShowRegisterInputs] = useState(false);
  const [authService, setAuthService] = useState(null);
  const [temporaryMessage, setTemporaryMessage] = useState("");

  useEffect(() => {
    setAuthService(new AuthService());
  }, []);

  const resetHeader = () => {
    setShowRegisterInputs(false);
    setShowAuthInputs(false);
  };

  const handleLogin = (input) => {
    const { email, password } = input;
    authService.login(email, password).then((response) => {
      if (response.status === 200) {
        resetHeader();
        displayTemporaryMessage("WELCOME");
        props.loadUserData();
      } else {
        handleAuthResponse(response);
      }
    });
  };

  const handleRegister = (input) => {
    const { email, password, passwordConfirm } = input;
    passwordConfirm === password
      ? authService.register(email, password).then((response) => {
          handleAuthResponse(response);
          response.status === 200 && resetHeader();
        })
      : displayTemporaryMessage("PASSWORDS DO NOT MATCH");
  };

  const handleAuthResponse = (response) => {
    const message = Object.values(response.data)[0].msg
      ? Object.values(response.data)[0].msg
      : response.data;
    displayTemporaryMessage(message.toUpperCase());
  };

  const loginOrRegister = (input) => {
    if (!showRegisterInputs) {
      handleLogin(input);
    } else {
      handleRegister(input);
    }
  };

  const displayTemporaryMessage = (message) => {
    setTemporaryMessage(message);
    setTimeout(() => {
      setTemporaryMessage(null);
    }, 2000);
  };

  return (
    <div id="headerContainer">
      <div
        id="header"
        className={`${temporaryMessage && "animate-header"}
          ${!showAuthInputs && "signed-in-header"}`}
      >
        {temporaryMessage && (
          <Typography className={"temporaryMessage"} variant="h5">
            {temporaryMessage}
          </Typography>
        )}
        {!temporaryMessage && (
          <React.Fragment>
            {props.loaded && (
              <div id="navButtonsContainer">
                {props.currentUser ? (
                  <SideMenu
                    id="sideMenuIconContainer"
                    loadUserData={props.loadUserData}
                  />
                ) : (
                  <div id="loginButtonContainer">
                    {!showAuthInputs || showRegisterInputs ? (
                      <Button
                        id="loginButton"
                        onClick={() => {
                          setShowAuthInputs(true);
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
            {showAuthInputs && (
              <AuthInputs
                resetHeader={resetHeader}
                loginOrRegister={loginOrRegister}
                showRegisterInputs={showRegisterInputs}
              />
            )}
            {!showAuthInputs && (
              <PlaylistSearchBar playlists={props.playlists} />
            )}
            {props.currentUser && (
              <div id="messaging-icon-column">
                <div
                  id="messaging-icon-container"
                  onClick={props.toggleMessagingSidebar}
                >
                  {!props.messagingSidebarOpen ? (
                    <ChatBubbleOutlineIcon
                      id="messaging-icon-outline"
                      style={{
                        fontSize: 40,
                      }}
                    ></ChatBubbleOutlineIcon>
                  ) : (
                    <ChatBubbleIcon
                      id="messaging-icon-filled"
                      style={{ fontSize: 40 }}
                    ></ChatBubbleIcon>
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Header;
