import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export default function SavedRoomCard({fetchUser, info, id}) {

  async function deleteSavedRoom () {
    const options = {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'savedRooms': `${info._id}`})};
    await fetch(`/api/users/unsaveroom`, options);
    await fetchUser();
  }

  return (
    <div className='saved-room'>
      <p><label>Subject: </label>{info.subject} </p>
      <p><label>Restricted: </label>{info.restricted ? 'Yes' : 'No'}</p>
      <p><label>Allowed users: </label></p>
      <Link to={"/main/room"} state={{info}}><Button variant='contained' id="joinRoom">Join Room</Button></Link>
      <Button variant='contained' id="removeMyRoom" onClick={deleteSavedRoom}>Remove</Button>
    </div>
  );
}