import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function SavedRoomCard({ fetchUser, info, id }) {
  const [host, setHost] = useState('');
  const [requested, setRequested] = useState(false);

  const currentUserId = id;

  const getHost = async () => {
    const user = await fetch(`/api/users/${info.host}`).then((response) =>
      response.json()
    );
    setHost(user.nickname);
  };

  useEffect(() => {
    getHost();
  }, []);

  async function deleteSavedRoom() {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedRooms: `${info._id}` }),
    };
    await fetch('/api/users/unsaveroom', options);
    await fetchUser();
  }
  const requestJoin = async () => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUserId: currentUserId }),
    };
    await fetch(`/api/rooms/addUser/${info._id}`, options);
    console.log("Added current user to room's pending list");
    setRequested(true);
  };

  //checks if current user is in room's allowed user list
  const ableToJoin = (userInfoObject) => {
    if (userInfoObject.classroom) {
      return userInfoObject.allowedUsers
        .map((e) => e._id)
        .includes(currentUserId);
    }
    return true;
  };

  const isPendingRequest = (userInfoObject) => {
    return userInfoObject.pendingUsers
      .map((e) => e._id)
      .includes(currentUserId);
  };

  const joinRoom = (
    <Link to="/main/room" state={{ info }}>
      <Button variant="contained">Join Room</Button>
    </Link>
  );

  const requestRoom = (
    <Button variant="contained" onClick={requestJoin}>
      Request to Join
    </Button>
  );

  const pendingRequest = <Button variant="contained">Pending Request</Button>;

  return (
    <div className="saved-room">
      <p>
        <label>Subject: </label>
        {info.subject}{' '}
      </p>
      <p>
        <label>Host: </label>
        {host}{' '}
      </p>
      <p>
        <label>Classroom: </label>
        {info.classroom ? 'Yes' : 'No'}
      </p>
      {ableToJoin(info)
        ? joinRoom
        : requested || isPendingRequest(info)
        ? pendingRequest
        : requestRoom}
      <Button variant="outlined" id="removeMyRoom" onClick={deleteSavedRoom}>
        Remove
      </Button>
    </div>
  );
}
