import React, { useState, useEffect, useContext } from 'react';
import Room from '../components/Room';

function RoomContainer({ subject }) {
  const [rooms, setRooms] = useState([{subject: 'MATH', host: 'Lewis'}, {subject: 'SCIENCE', host: 'Pei'}]);
  const [addRoomModal, setModal] = useState(false);
  const [newRoom, setNewRoom] = useState({});
  // roomcontainer will retrieve current subject from useContext

  // fetch new room cards when subject changes
  const fetchRooms = async () => {
    // GET request to server api endpoint with subject in params
    const roomData = await fetch(`${subject}`).then(response => response.json());
    setRooms(roomData);
  }

  useEffect(() => {
    fetchRooms();
  }, [subject])

  // create function to add card via post req and update room list
  const addRoom = async () => {
    const updatedRoomList = await fetch('/room', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newRoom)
    }).then(response => response.json());

    setRooms(updatedRoomList);
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


  const roomCards = rooms.map((e, i) => {
    return (<Room info={e} deleteRoom={deleteRoom} key={JSON.stringify(e)}/>)
  })

  return (
    <div id='room-container'>
      <h2>Active {subject} Rooms</h2>
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
  )
}

export default RoomContainer;