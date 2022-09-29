import React, { useState, useEffect, useContext } from 'react';

function RoomContainer() {
  const [subject, setSubject] = useState('');
  const [rooms, setRooms] = useState([]);
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

  return (
    <div id='room-container'>

    </div>
  )
}

export default RoomContainer;