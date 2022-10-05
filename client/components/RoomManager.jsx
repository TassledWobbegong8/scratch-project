import React, { useState } from 'react';
import ProfileRoomCard from '../components/ProfileRoomCard';
import RoomEditor from './RoomEditorModal';

function RoomManager({ fetchUser, rooms }) {
  const [addRoomModal, setModal] = useState(false);

  const closeModal = (event) => {
    event.preventDefault();
    setModal(false);
  };

  const roomCards = rooms.map((e, i) => {
    return <ProfileRoomCard info={e} key={i} fetchUser={fetchUser} />;
  });

  return (
    <div id='room-manager'>
      <div id='profile-tab'>Room Manager</div>
      <div className="profile-room-container">
        <h2>Hosted Rooms:</h2>

        {!addRoomModal ?
          <button id='open-add-room' 
            onClick={() => setModal(true)}
          >+</button>
          : <RoomEditor closeModal={closeModal} fetchUser={fetchUser} action={'add'} />}

        {roomCards}

        

      </div>
    </div>
  );
}

export default RoomManager;