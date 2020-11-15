import React, { useEffect, useState } from "react";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { AuthService, MessagingService, UserService } from "../../services";
import { AuthInputs, PlaylistSearchBar, SideMenu } from "..";
import { Button, Typography } from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useHistory } from "react-router-dom";
import "../../assets/pixelFire.gif";
import "./header.scss";

function Header(props) {
  const [showAuthInputs, setShowAuthInputs] = useState(false);
  const [showRegisterInputs, setShowRegisterInputs] = useState(false);
  const [authService, setAuthService] = useState(null);
  const [userService, setUserService] = useState(null);
  const [temporaryMessage, setTemporaryMessage] = useState("");
  const [fireBackground, setFireBackground] = useState(false);
  const [enterUsername, setEnterUsername] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setAuthService(new AuthService());
    setUserService(new UserService());
  }, []);

  const resetHeader = () => {
    setShowRegisterInputs(false);
    setShowAuthInputs(false);
  };

  const handleLogin = (input) => {
    const { email, password } = input;
    authService.login(email, password).then((response) => {
      if (response.status === 200) {
        const messagingService = new MessagingService();
        messagingService.disconnectSocket();
        if (response.data.username) {
          resetHeader();
          welcome(response.data.username);
        } else {
          setEnterUsername(true);
          displayTemporaryMessage("WHAT SHOULD WE CALL YOU?");
        }
        props.loadUserData();
      } else {
        displayAuthResponse(response);
      }
    });
  };

  const handleSetUsername = (username) => {
    userService
      .setUsername(props.currentUser._id, username)
      .then((response) => {
        if (response.status === 200) {
          welcome(response.data.username);
          setEnterUsername(false);
          props.loadUserData();
        } else {
          displayAuthResponse(response);
        }
      });
  };

  const welcome = (username) => {
    resetHeader();
    displayTemporaryMessage(`WELCOME, ${username}`);
  };

  const handleRegister = (input) => {
    const { email, password, passwordConfirm } = input;
    passwordConfirm === password
      ? authService.register(email, password).then((response) => {
          displayAuthResponse(response);
          response.status === 200 && resetHeader();
        })
      : displayTemporaryMessage("PASSWORDS DO NOT MATCH");
  };

  const displayAuthResponse = (response) => {
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
        className={`
          ${temporaryMessage && "color-animation"}
          ${!showAuthInputs && "signed-in-header"} 
          ${fireBackground && "hot"}
        `}
      >
        {temporaryMessage && (
          <Typography className={"temporaryMessage"} variant="h5">
            {temporaryMessage}
          </Typography>
        )}
        {!temporaryMessage && props.loaded && (
          <React.Fragment>
            <div id="navButtonsContainer">
              {props.currentUser && props.currentUser.username ? (
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
            {showAuthInputs && (
              <AuthInputs
                resetHeader={resetHeader}
                loginOrRegister={loginOrRegister}
                handleSetUsername={handleSetUsername}
                enterUsername={enterUsername}
                setEnterUsername={setEnterUsername}
                showRegisterInputs={showRegisterInputs}
              />
            )}
            {!showAuthInputs && (
              <PlaylistSearchBar
                playlists={props.playlists}
                displayTemporaryMessage={displayTemporaryMessage}
              />
            )}
            <div id="messaging-icon-column" className="pixel-fire">
              <div
                id="messaging-icon-container"
                onClick={props.toggleMessagingSidebar}
              >
                {props.currentUser && props.currentUser.username ? (
                  <React.Fragment>
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
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {!showAuthInputs && (
                      <WhatshotIcon
                        onClick={() => history.push("/")}
                        onMouseOver={() => setFireBackground(true)}
                        onMouseLeave={() => setFireBackground(false)}
                        style={{ fontSize: 40 }}
                      />
                    )}
                  </React.Fragment>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Header;
