import React, { useState, useEffect, useContext } from "react";
import { TextField, Button } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Login( {logout, login} ) {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");

  const loginDetails = (
    <div id="settings-container">
      <h2 id="login-text">Login Details</h2>
        <TextField label="Email Address"/>
        <TextField label="Password"/>
        <Link to="/main/home">
          <Button onClick={()=>login()} variant="contained" style={{maxWidth: '240px', maxHeight: '50px', minWidth: '240px', minHeight: '50px', margin: "0 auto", position: 'relative'}}>Login </Button>
        </Link>
    </div>)

  return loginDetails
}