import React, { useState, useEffect, useContext } from "react";

function ProfileRoomCard({ info, deleteRoom }) {
  return (
    <div className='profile-room'>
      <label>Subject: </label>
      <label>Restricted: </label>
      <button id="deleteRoom" onClick={(event) => deleteRoom(event, info._id)}>Delete Room</button>
    </div>
  )
}

export default function Profile() {
  const [profileInformation, setProfileInformation] = useState({username: 'lewislin9', rooms: [{}]});
  const [addRoomModal, setModal] = useState(false);
  const [newRoom, setNewRoom] = useState({});

  const fetchUser = async () => {
    // GET request to server api endpoint with user ID in the cookie
    const userData = await fetch('/api/user').then(response => response.json());
    setProfileInformation(userData);
  }

  // useEffect(() => {
  //   fetchUser();
  // }, [])

  // create function to add card via post req and update room list
  const addRoom = async () => {
    const updatedRoomList = await fetch('/api/room', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newRoom)
    }).then(response => response.json());

  }
  // create function to delete card via delete req and update room list (to be drilled down to Room)
  function deleteRoom (event, id) {
    // to delete a room, we will update the state object room
    // on first render, the useEffect fires and fetches all of the room data from the database and updates the rooms state variable
    // this will cause all existing rooms to be displayed
    // to delete a room we need to:

    // copy the information of the room,
    const roomInfoToBeDeleted = null;
    console.log(id)
    event.preventDefault();
    // send a delete request to the database to delete the room
      // fetch("URL", OPTIONS).then(res => res.json).then(data)
    // re-render the component and trigger useEffect to send a GET request for new room data
      // fetchRooms() or extract array from fetched data and setRooms((prevList) => {return newListOfRooms});
  }

  const roomCards = profileInformation.rooms.map((e, i) => {
    return <ProfileRoomCard info={e} key={i} deleteRoom={deleteRoom}/>
  })

  return (
    <div id='user-profile'>
      <h1>My Profile</h1>
      <p className='profile-field'>Username: {profileInformation.username}</p>

      <div className="profile-room-container">
        <h2>Active Rooms:</h2>
        {roomCards}

        {!addRoomModal ?
        <button id='open-add-room' onClick={() => setModal(true)}>+</button>
        : <div id='add-room-modal'>
          <form>
            <label className='new-room-label'>Subject: </label>
            <input className='new-room-input' type='text' onChange={event => setNewRoom({...newRoom, subject: event.target.value})}></input>
            <label className='new-room-label'>Restricted: </label>
            {/*use MUI toggle switch here to change restricted prop of new room*/}
            <button onClick={() => addRoom()}>Add new room</button>
            <button onClick={() => setModal(false)}>Cancel</button>
          </form>
        </div>}

      </div>
    </div>
  )
}

