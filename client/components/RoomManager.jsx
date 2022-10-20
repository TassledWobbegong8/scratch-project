import React, { useState } from 'react';
import ProfileRoomCard from '../components/ProfileRoomCard';
import RoomEditor from './RoomEditorModal';
import SavedRoomCard from './SavedRoomCard';
import AppointmentsPg from './Appointments';

function RoomManager({ fetchUser, rooms, savedRoomsProps, host }) {
  //Using React hooks, declare new state variables 'addRoomModal' and 'setSavedRoom'
  const [addRoomModal, setModal] = useState(false); //the initial state of setModal is set to false
  const [addSavedRoom, setSavedRoom] = useState(false);//the initial state of addSavedRoom is set to false
  const [selectedTab, setSelectedTab] = useState(false);

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

  //return appointments page
  // const appointmentsPg = 

  //Room manager tab is a div with a header. If addRoomModal is false, add button and onclick, setModal is true
  const hostedRooms = (
    <div className="profile-room-container">
      <h3> Hosted Rooms</h3>
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
      <h3> Saved Rooms</h3>
      {savedRoomCards}
    </div>
  );

  const savedRooms = (
    <div className="profile-room-container">
      <h3>Saved Rooms</h3>
      {savedRoomCards}
    </div>
  );

  //Appointments tab
  const appointments = (
    <div className="profile-room-container">
      <h3>Appointments</h3>
      <AppointmentsPg />
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
          onClick={() => {
            setModal(false);
            setSavedRoom(true);
          }}
          id="saved-rooms-tab">
          Appointments
        </button>

        {/* <button 
          onClick={() => {
            setModal(false);
            setSelectedTab(true);
          }}
          id="appointments-tab">
          Appointments
        </button> */}

      </div>
      { !addSavedRoom ? hostedRooms : appointments}
    </div>
  );
}

export default RoomManager;


//tab if selected... then display that tab
//if initial state is false---then
// {!addSavedRoom ? hostedRooms : savedRooms}

{/* <div id="tabs">

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
  onClick={() => {
    setModal(false);
    setSavedRoom((prevState) => {
      return false;
    });
  }}
  id="saved-rooms-tab">
  Saved Rooms
</button>

<button 
  onClick={() => {
    setModal(false);
    setSavedRoom(true);
  }}
  id="appointments-tab">
  Appointments
</button>

</div>
{ !addSavedRoom ? hostedRooms : appointments} */}
