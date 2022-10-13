import React, { useEffect, useState } from 'react';
import RoomManager from '../components/RoomManager';

export default function Profile() {
  const initialUser = {
    username: '',
    nickname: '',
    rooms: []};

  const [profileInformation, setProfileInformation] = useState(initialUser);

  const fetchUser = async () => {
    // GET request to server api endpoint with user ID in the cookie
    // ****THIS IS FAKE ENDPOINT DON'T USE IN PRODUCTION
    const fakeEndpoint = '/api/users/633b95312ab28a4c27eabc57';
    const userData = await fetch('/api/users').then(response => response.json());
    console.log('profile user data', userData);
    if(userData) setProfileInformation(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div id='user-profile'>
      <h1>{profileInformation.nickname || 'My Profile'}</h1>
      <p className='profile-field'>@{profileInformation.username}</p>
      <RoomManager fetchUser={fetchUser} rooms={profileInformation.rooms} savedRoomsProps={profileInformation.savedRooms} host={profileInformation._id}/>
    </div>
  );
}

