/* eslint-disable indent */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import RoomEditor from './RoomEditorModal';

function ProfileRoomCard({ fetchUser, info }) {
  const [editRoomModal, setModal] = useState(false);

  // create function to delete card via delete req and update room list (to be drilled down to Room)
  const deleteRoom = async (id) => {
    const deleted = await fetch(`/api/rooms/${id}`, {
      method: 'DELETE',
    }).then((response) => response.json());

    fetchUser();
  };

  const approveUser = async (approvedUserId) => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approvedUserId: approvedUserId }),
    };
    await fetch(`/api/rooms/approveUser/${info._id}`, options);
  };

  const closeModal = (event) => {
    event.preventDefault();
    setModal(false);
  };
  console.log('info', info);
  //hosted rooms card
  return (
    <div className="profile-room">
      <p>
        <label>Subject: </label>
        {info.subject}
      </p>
      <p>
        <label>Classroom: </label>
        {info.classroom ? 'Yes' : 'No'}
      </p>
      <p>
        <label>Allowed Students: </label>
        {info.allowedUsers.length > 0
          ? info.allowedUsers.map((e) => e.nickname).join(', ')
          : 'None'}
      </p>
      <Link to="/main/room" state={{ info }}>
        <Button variant="contained" id="open-room-btn">
          Open Room
        </Button>
      </Link>

      <Button
        variant="outlined"
        id="edit-room-btn"
        onClick={() => setModal(true)}>
        Edit Room
      </Button>
      <Button id="delete-room-btn" onClick={() => deleteRoom(info._id)}>
        Delete Room
      </Button>

      {info.pendingUsers.length > 0
        ? info.pendingUsers.map((e) => (
            <p key={'pending' + e._id}>
              {e.nickname}
              <button onClick={() => approveUser(e._id)}>Approve User? </button>
            </p>
          ))
        : ''}

      {editRoomModal && (
        <RoomEditor
          fetchUser={fetchUser}
          action={'edit'}
          id={info._id}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default ProfileRoomCard;
