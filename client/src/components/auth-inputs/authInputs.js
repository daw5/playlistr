import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TextField, Button } from "@material-ui/core";
import "../header/header.scss";

function AuthInputs(props) {
  const [authInput, setAuthInput] = useState({});
  const emailInput = useRef(null);

  const handleEnterPressed = (evt) => {
    console.log("auth input : ", authInput);
    if (evt.key === "Enter") {
      !props.enterUsername
        ? props.loginOrRegister(authInput)
        : props.handleSetUsername(authInput.username);
    }
  };

  useEffect(() => {
    emailInput && emailInput.current.focus();
  }, [props.showRegisterInputs]);

  const authInputStyles = { border: "1px solid white", color: "white" };

  return (
    <div
      id="authInputs"
      className={props.showRegisterInputs ? "showRegisterInputs" : ""}
    >
      <TextField
        autoFocus
        inputRef={emailInput}
        value={authInput.username || authInput.email || ""}
        className={`authInput emailInput ${
          props.enterUsername && "username-input"
        }`}
        size="small"
        onChange={(evt) =>
          !props.enterUsername
            ? setAuthInput({ ...authInput, email: evt.target.value })
            : setAuthInput({ ...authInput, username: evt.target.value })
        }
        onKeyDown={(evt) => handleEnterPressed(evt)}
        variant="outlined"
        placeholder={!props.enterUsername ? "Email" : "Username"}
        InputProps={{ style: authInputStyles }}
      />
      {!props.enterUsername && (
        <TextField
          type="password"
          value={authInput.password || ""}
          className={"authInput passwordInput"}
          size="small"
          onChange={(evt) =>
            setAuthInput({ ...authInput, password: evt.target.value })
          }
          onKeyDown={(evt) => handleEnterPressed(evt)}
          variant="outlined"
          placeholder="Password"
          InputProps={{ style: authInputStyles }}
        />
      )}
      {props.showRegisterInputs && (
        <TextField
          type="password"
          value={authInput.passwordConfirm || ""}
          className={"authInput confirmPasswordInput"}
          size="small"
          onChange={(evt) =>
            setAuthInput({
              ...authInput,
              passwordConfirm: evt.target.value,
            })
          }
          onKeyDown={(evt) => handleEnterPressed(evt)}
          variant="outlined"
          placeholder="Confirm Password"
          InputProps={{ style: authInputStyles }}
        />
      )}

      <div
        className={
          props.showRegisterInputs
            ? "loginSubmitContainerRegister"
            : "loginSubmitContainer"
        }
      >
        <Button
          onClick={() => props.loginOrRegister(authInput)}
          variant="outlined"
          className={"submit"}
        >
          <ChevronRightIcon fontSize="large" />
        </Button>
        <Button
          onClick={() => props.resetHeader() && setAuthInput({})}
          variant="outlined"
          className={"close"}
        >
          <CloseIcon fontSize="default" />
        </Button>
      </div>
    </div>
  );
}

export default AuthInputs;
