import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { UserService } from "../services";
require("dotenv").config();

export default function Messaging() {
  const [recipient, setRecipient] = useState(null);
  const [users, setUsers] = useState([]);
  const userService = new UserService();

  useEffect(() => {
    userService.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <div>
      <Autocomplete
        id="users-list"
        name="recipient"
        options={users}
        onChange={(evt) => setRecipient(users[evt])}
        getOptionLabel={(option) => option.email}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="User" variant="outlined" />
        )}
      />
      <TextField
        id="standard-textarea"
        label="Multiline Placeholder"
        placeholder="Placeholder"
        multiline
      />
    </div>
  );
}
