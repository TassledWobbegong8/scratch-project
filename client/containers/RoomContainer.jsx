import React, { useState, useEffect, useContext } from 'react';
import Room from '../components/Room';

function RoomContainer() {
  const [subject, setSubject] = useState('');
  const [rooms, setRooms] = useState([{}]);
  // roomcontainer will retrieve current subject from useContext

  // // fetch new room cards when subject changes
  // const fetchRooms = async () => {
  //   // GET request to server api endpoint with subject in params
  //   const roomData = await fetch(`${subject}`).then(response => response.json());
  //   setRooms(roomData);
  // }

  // useEffect(() => {
  //   fetchRooms();
  // }, [subject])

  const roomCards = rooms.map((e, i) => {
    return (<Room info={e} key={i}/>)
  })

  return (
    <div id='room-container'>
      <h2>Active Rooms</h2>
      {roomCards}
    </div>
  )
}

export default RoomContainer;