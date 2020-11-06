import React, { useEffect, useState, useRef } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { TextField, Button, makeStyles } from "@material-ui/core";
import { theme } from "../../material-overrides/header";
import "../header/header.scss";

function AuthInputs(props) {
  const [authInput, setAuthInput] = useState({});
  const emailInput = useRef(null);

  const handleEnterPressed = (evt) => {
    evt.key === "Enter" && props.loginOrRegister(authInput);
  };

  useEffect(() => {
    emailInput && emailInput.current.focus();
  }, [props.showRegisterInputs]);

  const authInputStyles = makeStyles((theme) => ({
    root: {
      border: "1px solid white",
      color: "white",
    },
  }));

  const authInputClasses = authInputStyles();

  return (
    <div
      id="authInputs"
      className={props.showRegisterInputs ? "showRegisterInputs" : ""}
    >
      <TextField
        autoFocus
        inputRef={emailInput}
        value={authInput.email || ""}
        className={"authInput emailInput"}
        size="small"
        onChange={(evt) =>
          setAuthInput({ ...authInput, email: evt.target.value })
        }
        onKeyDown={(evt) => handleEnterPressed(evt)}
        variant="outlined"
        placeholder="Email"
        InputProps={{ classes: authInputClasses }}
      />
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
        InputProps={{ classes: authInputClasses }}
      />
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
          InputProps={{ classes: authInputClasses }}
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
