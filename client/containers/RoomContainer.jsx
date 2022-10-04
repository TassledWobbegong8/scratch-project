import React, { useState, useEffect, useContext } from 'react';
import RoomCard from '../components/RoomCard';
import { Card } from '@mui/material';

function RoomContainer({ subject }) {
  const [rooms, setRooms] = useState([{subject: 'MATH', host: 'Lewis'}, {subject: 'SCIENCE', host: 'Pei'}, {subject: 'ENGLISH', host: 'Eric'}, {subject: 'SCIENCE', host: 'Uma'}, {subject: 'MATH', host: 'Matt Severyn'},]);
  // roomcontainer will retrieve current subject from useContext

  // fetch new room cards when subject changes
  const fetchRooms = async () => {
    // GET request to server api endpoint with subject in params
    const roomData = await fetch(`/api/rooms/${subject}`).then(response => response.json());
    setRooms(roomData);
  }

  useEffect(() => {
    fetchRooms();
  }, [subject])


  const roomCards = rooms.map((e, i) => {
    return (<Card variant="outlined" key={JSON.stringify(e)}>{<RoomCard info={e} />}</Card>)
  })

  return (
    <div id='room-container'>
      <h2>Active {subject} Rooms</h2>
      {roomCards}
    </div>
  )
}

export default RoomContainer;