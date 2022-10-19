import React, { useState, useEffect, useContext } from 'react';
import RoomCard from '../components/RoomCard';
import { Card } from '@mui/material';

function RoomContainer({ subject }) {
  const [rooms, setRooms] = useState([]);
  // roomcontainer will retrieve current subject from useContext

  // fetch new room cards when subject changes
  const fetchRooms = async () => {
    // GET request to server api endpoint with subject in params
    const roomData = await fetch(`/api/rooms/${subject}`).then(response => response.json());
    if(Array.isArray(roomData)) setRooms(roomData);
    else setRooms([]);
  };

  useEffect(() => {
    fetchRooms();
  }, [subject]);


  const roomCards = rooms.map((e, i) => {
    return (<RoomCard info={e} key={JSON.stringify(e)} id={e._id}/>);
  });

  return (
    <div id='room-container'>
      <h2>Active {subject} Rooms</h2>
      {roomCards}
    </div>
  );
}

export default RoomContainer;