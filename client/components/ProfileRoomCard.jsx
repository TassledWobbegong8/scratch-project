import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoomEditor from './RoomEditorModal';

function ProfileRoomCard({ fetchUser, info }) {
  const [editRoomModal, setModal] = useState(false);

  // create function to delete card via delete req and update room list (to be drilled down to Room)
  const deleteRoom = async (id) => {
    const deleted = await fetch(`/api/rooms/${id}`, {
      method: 'DELETE',
    }).then(response => response.json());

    fetchUser();
  };

  const closeModal = (event) => {
    event.preventDefault();
    setModal(false);
  };


  return (
    <div className='profile-room'>
      <p><label>Subject: </label>{info.subject}</p>
      <p><label>Restricted: </label>{info.restricted ? 'Yes' : 'No'}</p>
      <p><label>Allowed users: </label></p>
      <Link to='/main/room' state={{ info }}><Button variant='contained' id="open-room-btn" >Open Room</Button></Link>

      <Button variant='outlined' id="edit-room-btn" onClick={() => setModal(true)}>Edit Room</Button>
      <Button id="delete-room-btn" onClick={() => deleteRoom(info._id)}>Delete Room</Button>

      {editRoomModal && <RoomEditor fetchUser={fetchUser} action={'edit'} id={info._id} closeModal={closeModal} />}

    </div>
  );
}

export default ProfileRoomCard;