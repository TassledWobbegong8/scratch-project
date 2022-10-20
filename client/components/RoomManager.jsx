import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ProfileRoomCard from '../components/ProfileRoomCard';
import RoomEditor from './RoomEditorModal';
import SavedRoomCard from './SavedRoomCard';

function RoomManager({ fetchUser, rooms, savedRoomsProps, host, files }) {
  const [addRoomModal, setModal] = useState(false);
  const [addSavedRoom, setSavedRoom] = useState(false);

  // console.log(fetchUser);
  // console.log(rooms);
  // console.log(savedRoomsProps);

  // useEffect(() => {
  //   async function getUser() {
  //     user = await fetchUser();
  //   }
  //   getUser();
  // }, [addRoomModal, addSavedRoom]);
  console.log('ROOM MANAGER ROOMS ', rooms);
  console.log('ROOM MANAGER PROPS ', savedRoomsProps);
  console.log('ROOM MANAGER HOST ', host);

  const setRoomCookie =  async(roomID) => {
    const response = await fetch('http://localhost:3000/api/rooms/cookie', {
      method: 'POST',
      body: JSON.stringify({ room: roomID }),
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:8080'
      },
    });

    const success = await response.json();
  };

  const closeModal = (event) => {
    event.preventDefault();
    setModal(false);
  };

  const roomCards = rooms.map((e, i) => {
    return <ProfileRoomCard info={e} key={i} fetchUser={fetchUser} files={files} setRoomCookie={setRoomCookie} roomId={e._id}/>;
  });

  const savedRoomCards = savedRoomsProps ? savedRoomsProps.map((e, i) => {
    return <SavedRoomCard id={host} info={e} key={i} fetchUser={fetchUser} setRoomCookie={setRoomCookie} roomId={e._id}/>;
  }) : <div/>;


  const hostedRooms = (
    <div>
      <h2>Hosted Rooms:</h2>
      {!addRoomModal ?
        <button id='open-add-room'
          onClick={() => setModal(true)}
        >+</button>
        : <RoomEditor closeModal={closeModal} fetchUser={fetchUser} action={'add'} />}
      {roomCards}
    </div>
  );

  const savedRooms =  (
    <div>
      <h2>Saved Rooms:</h2>
    </div>
  );

  return (
    <div id='room-manager'>
      <div id='tabs'>
        <button onClick={(()=>{setModal(false); setSavedRoom((prevState) => {return false;});})} id='profile-tab'>Room Manager</button>
        <button onClick={()=>setSavedRoom(true)} id='saved-rooms-tab'>Saved Rooms</button>
      </div>
      {!addSavedRoom ?
        <div className="profile-room-container">
          {hostedRooms}
        </div> : <div className="profile-room-container">
          {savedRooms}
          {savedRoomCards}
        </div>}
    </div>
  );
}

export default RoomManager;