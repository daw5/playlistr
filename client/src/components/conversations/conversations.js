import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./conversations.scss";

require("dotenv").config();

export default function Conversations(props) {
  return (
    <div>
      <Autocomplete
        id="users-list"
        name="recipient"
        options={props.users}
        onChange={(evt) => props.setRecipient(props.users[evt.target.value])}
        getOptionLabel={(option) => option.email}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="User" variant="outlined" />
        )}
      />
      <div>{}</div>
    </div>
  );
}
