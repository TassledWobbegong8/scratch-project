import React, { useState } from 'react';
import { Switch, Button } from '@mui/material';

function RoomEditor({ fetchUser, closeModal, action, id }) {
  const [warning, setWarning] = useState(false);
  const [updatedRoom, setRoom] = useState({subject: '', restricted: false});

  // create function to add card via post req and update room list
  const addRoom = async () => {
    // check that all fields are filled
    if (!updatedRoom.subject) {
      console.log(updatedRoom)
      setWarning(true);
      return;
    }
    // fetch request will return new room doc
    const newRoomData = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedRoom)
    }).then(response => response.json());

    // update user to reset state
    fetchUser();
  }

  // edit function to edit card via patch req and update room list
  const editRoom = async () => {
    // check that all fields are filled
    if (!updatedRoom.subject) {
      console.log(updatedRoom)
      setWarning(true);
      return;
    }
    // fetch request will return new room doc
    const updatedRoomData = await fetch(`/api/room/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedRoom)
    }).then(response => response.json());

    // update user to reset state
    fetchUser();
  }

  const addRoomBtn = <button onClick={(event) => {
    event.preventDefault();
    addRoom()}}>Add new room</button>

  const editRoomBtn = <button onClick={(event) => {
    event.preventDefault();
    editRoom()}}>Update room</button>

  return (
    <div id='room-editor-modal'>
          <form>
            <label className='room-editor-label'>Subject: </label>
            <input className='room-editor-input' type='text' onChange={event => setRoom({...updatedRoom, subject: event.target.value})} ></input>
            <label className='room-editor-label'>Restricted: </label>
            <Switch onClick={() => setRoom({...updatedRoom, restricted: !updatedRoom.restricted})} />
            {action === 'add' ? addRoomBtn : editRoomBtn}
            <button onClick={closeModal}>Cancel</button>
          </form>
          {warning && <p className="warning">All fields must be filled!</p>}
        </div>
  )
}

export default RoomEditor;