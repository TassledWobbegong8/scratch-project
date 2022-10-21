import React, { useState, useEffect, useContext } from 'react';
import RoomCard from '../components/RoomCard';

function RoomContainer({ subject, id }) {
  const [rooms, setRooms] = useState([]);
  const [currentUserId, setCurrentUserId] = useState({});
  // roomcontainer will retrieve current subject from useContext

  // fetch new room cards when subject changes
  const fetchRooms = async () => {
    // GET request to server api endpoint with subject in params
    const roomData = await fetch(`/api/rooms/${subject}`).then((response) =>
      response.json()
    );
    if (Array.isArray(roomData)) setRooms(roomData);
    else setRooms([]);
  };

  const fetchUser = async () => {
    const userData = await fetch('/api/users').then((response) =>
      response.json()
    );
    if (userData) setCurrentUserId(userData._id);
  };

  useEffect(() => {
    fetchRooms();
  }, [subject]);

  useEffect(() => {
    fetchUser();
  }, []);

  const roomCards = rooms.map((e, i) => {
    return <RoomCard info={e} key={JSON.stringify(e)} currentUserId = {currentUserId} id={id} />;
  });

  return (
    <div id="room-container">
      <h3>Active {subject} Rooms</h3>
      {roomCards}
    </div>
  );
}

export default RoomContainer;
