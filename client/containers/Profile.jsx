import React, { useState, useEffect, useContext } from "react";

export default function Profile() {
  const [profileInformation, setProfileInformation] = useState({username: 'lewislin9'});

  // const fetchUser = async () => {
  //   // GET request to server api endpoint with user ID in the cookie
  //   const userData = await fetch('/user').then(response => response.json());
  //   setProfileInformation(userData);
  // }

  // useEffect(() => {
  //   fetchUser();
  // }, [])

  return <h1>Username: {profileInformation.username}</h1>

}