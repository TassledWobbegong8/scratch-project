import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbox from '../components/Chatbox';
import DocumentEditor from '../components/DocumentEditor';

function Room( ) {
  const [roomDetails, setDetails] = useState({});

  const { info } = useLocation().state;
  console.log(info)

  // const fetchRoomDetails = async () => {
  //   const details = await fetch(`/api/rooms/${id}`).then(response => response.json());
  //   setDetails(details);
  // };

  // useEffect(() => {
  //   fetchRoomDetails();
  // }, []);

  return (
    <div className="room-page">
      <div id='room-page-info'>
        <h2>Host: {info.host.username} </h2>
      </div>
      <DocumentEditor />
      <Chatbox />
    </div>
  );
}

export default Room;