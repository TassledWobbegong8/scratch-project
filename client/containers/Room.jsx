import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbox from '../components/Chatbox';
import DocumentEditor from '../components/DocumentEditor';

function Room( ) {
  const [hostInfo, setHost] = useState({});
  const [hostView, setHostView] = useState(false);

  const { info } = useLocation().state;

  // fetch host if info doesn't already exist
  const fetchHost = async () => {
    const details = await fetch('/api/users/user').then(response => response.json());
    setHost(details);
    // if room host is the same as the current user
    if (!info.host._id || info.host._id === details._id) setHostView(true);
  };

  useEffect(() => {
    fetchHost();
  }, []);

  return (
    <div className="room-page">
      <div id='room-page-info'>
        <h2>Host: {info.host.nickname || hostInfo.nickname} </h2>
      </div>
      <DocumentEditor hostView={hostView}/>
      <Chatbox />
    </div>
  );
}

export default Room;