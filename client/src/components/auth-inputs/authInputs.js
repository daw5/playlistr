import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  TextField,
  Button,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core";
import { theme } from "../../material-overrides/header";
import "../header/header.scss";

function AuthInputs(props) {
  const defaultAuthInput = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [authInput, setAuthInput] = useState(defaultAuthInput);

  const authInputStyles = makeStyles((theme) => ({
    root: {
      border: "1px solid white",
      color: "white",
    },
  }));

  const authInputClasses = authInputStyles();

  return (
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
        {props.showRegisterInputs && (
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
            onClick={() =>
              props.resetHeader() && setAuthInput(defaultAuthInput)
            }
            variant="outlined"
            className={"close"}
          >
            <CloseIcon fontSize="default" />
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default AuthInputs;
