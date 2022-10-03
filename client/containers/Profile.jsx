import React, { useState, useEffect } from "react";
import RoomManager from "../components/RoomManager";

export default function Profile() {
  // FAKE DATA FOR STATE --> DELETE OR COMMENT OUT LATER!!
  const fakeUser = {
    username: 'lewislin9', 
    nickname: 'Lewlew',
    rooms: [{subject: 'MATH', restricted: true}, {subject: 'SCIENCE', restricted: false}]};

  const [profileInformation, setProfileInformation] = useState(fakeUser);

  const fetchUser = async () => {
    // GET request to server api endpoint with user ID in the cookie
    const userData = await fetch('/api/user').then(response => response.json());
    setProfileInformation(userData);
  }

  // useEffect(() => {
  //   fetchUser();
  // }, [])

  return (
    <div id='user-profile'>
      <h1>{profileInformation.nickname || 'My Profile'}</h1>
      <p className='profile-field'>@{profileInformation.username}</p>
      <RoomManager fetchUser={fetchUser} rooms={profileInformation.rooms} />
    </div>
  )
}

