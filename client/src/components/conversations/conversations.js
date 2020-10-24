import React, { useState, useEffect } from "react";
import "./conversations.scss";

require("dotenv").config();

export default function Conversations(props) {
  return (
    <div>
      <Autocomplete
        id="users-list"
        name="recipient"
        options={users}
        onChange={(evt) => setRecipient(users[evt.target.value])}
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
