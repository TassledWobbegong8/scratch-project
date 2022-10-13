import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { Button, Card, Typography} from '@mui/material';

function RoomContainer({ subject, id, username }) {
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


  const roomCards = 
  rooms.map((e, i) => {
    return (<RoomCard info={e} key={JSON.stringify(e)} id={id} username={username} />);
  });

  /* if there are no room cards to display, place a warning */
  const noRooms = <Link to='/main/profile'><Button id='no-subject' className='warning'><Typography style={{color: 'red'}}>There are no rooms. Let&apos;s create one!</Typography></Button> </Link>;

  return (
    <div id='room-container'>
      <h2>Active {subject} Rooms</h2>
      {!roomCards.length ? noRooms : roomCards}
    </div>
  );
}

export default RoomContainer;
