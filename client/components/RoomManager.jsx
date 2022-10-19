import React, { useState } from 'react';
import ProfileRoomCard from '../components/ProfileRoomCard';
import RoomEditor from './RoomEditorModal';
import SavedRoomCard from './SavedRoomCard';

function RoomManager({ fetchUser, rooms, savedRoomsProps, host }) {
  const [addRoomModal, setModal] = useState(false);
  const [addSavedRoom, setSavedRoom] = useState(false);

  // console.log(fetchUser);
  // console.log(rooms);
  // console.log(savedRoomsProps);

  const closeModal = (event) => {
    // e.preventDefault() prevents all the default behavior by the browser
    event.preventDefault();
    setModal(false);
  };

  //returns an array of profile room objects
  const roomCards = rooms.map((e, i) => {
    return <ProfileRoomCard info={e} key={i} fetchUser={fetchUser} />;
  });

  //if there are savedrooms,then return an array of saved room card objects, else return div
  const savedRoomCards = savedRoomsProps ? (
    savedRoomsProps.map((e, i) => {
      return <SavedRoomCard id={host} info={e} key={i} fetchUser={fetchUser} />;
    })
  ) : (
    <div />
  );

  //Room manager tab is a div with a header. If addRoomModal is false, add button and onclick, setModal is true
  const hostedRooms = (
    <div className="profile-room-container">
      <h2>Hosted Rooms:</h2>
      {!addRoomModal ? (
        <button id="open-add-room" onClick={() => setModal(true)}>
          +
        </button>
      ) : (
        <RoomEditor
          closeModal={closeModal}
          fetchUser={fetchUser}
          action={'add'}
        />
      )}
      {roomCards}
    </div>
  );

  const savedRooms = (
    <div className="profile-room-container">
      <h2>Saved Rooms:</h2>
      {savedRoomCards}
    </div>
  );

  //Appointments modal
  const appointments = (
    <div className="profile-room-container">
      <h2>Appointments:</h2>
    </div>
  );

  return (
    <div id="room-manager">

      <div id="tabs">

        <button
          onClick={() => {
            setModal(false);
            setSavedRoom((prevState) => {
              return false;
            });
          }}
          id="profile-tab"
        >
          Room Manager
        </button>

        <button 
          onClick={() => setSavedRoom(true)} 
          id="saved-rooms-tab">
          Saved Rooms
        </button>

        <button 
          onClick={() => setSavedRoom(true)}
          id="appointments-tab">
          Appointments
        </button>

      </div>
      {!addSavedRoom ? hostedRooms : savedRooms}

    </div>
  );
}

export default RoomManager;
