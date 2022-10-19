import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Chatbox from '../components/Chatbox';
import DocumentEditor from '../components/DocumentEditor';
import SelectedDocument from '../components/SelectedDocument';
import axios from 'axios';

function Room( ) {
  const [hostInfo, setHost] = useState({});//whoever is logged in
  const [hostView, setHostView] = useState(false);
  const [info, setInfo] = useState({});//room info
  const [activeDocument, setActiveDocument] = useState('');
  const [activeURL, setActiveURL] = useState('');

  const state = useLocation().state;

  // save roomdoc in cookie for retrieval after redirect
  const saveRoom = async () => {
    const response = await fetch('/api/rooms/cookie', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({room: info._id})
    });

    const saved = await response.json();
  };

  const getRoom = async () => {
    const response = await fetch('/api/rooms/cookie');
    const room = response.json();
    setInfo(room);
  };

  // fetch host if info doesn't already exist
  const fetchHost = async () => {
    const response = await fetch('/api/users');
    const details = await response.json();
    setHost(details);
    // if room host is the same as the current user
    if (!info.host._id || info.host._id === details._id) setHostView(true);
  };

  // update room info
  useEffect(() => {
    // if state exists then set info
    if (state) setInfo(state.info);
    // if info is null (no state) then retrieve room info
    if (!state) getRoom();
  }, [hostView]);

  // set host and set cookie for room
  useEffect(() => {
    if (info.host) fetchHost();
    // if info was read from state then save id
    if (state) saveRoom();
  }, [info]);

  const setActiveDocumentHandler = async (filename) => {
    //Check if the entered filename is empty or matches the current activeDocument
    if (!filename.trim().length || filename.trim() === activeDocument) return;

    //Set the activeDocument and then fetch the file from aws bucket endpoint
    await setActiveDocument(filename);

    const awsFile = await fetch(`http://localhost:3000/api/uploads/${filename}`);
    if (awsFile.ok){
      const url = await awsFile.json();
      console.log('url', url);
      setActiveURL(url);
    }
  };

  const fetchRoomInfo = async (id) => {
    // try {
    //   const response = await fetch('http://localhost:3000/api/rooms/cookie');
    
    //   if (response.ok) {
    //     const room = await response.json().roomDoc;
    //     console.log('Updated Room: ', room);
    //     setInfo(room);
    //   }
    // } catch (err) {
    //   console.log('Error fetching room info: ', err.message);
    // }
    const response = await axios.get('http://localhost:3000/api/rooms/cookie', {withCredentials: true});

    if (response.status === 200) {
      const room = response.data;
      console.log('Updated Room: ', room);
      setInfo(room);
    }
  };

  console.log('ROOM COMPONENT STATE', state);
  console.log('ROOM COMPONENT INFO', info);
  console.log('ROOM COMPONENT HOSTINFO', hostInfo);

  const deleteFile = "test"

  return (
    <div className="room-page">
      <div id='room-page-info'>
        <h2>Host: {info.host && (info.host.nickname || hostInfo.nickname)} </h2>
      </div>
      {hostView && 
      <DocumentEditor 
        hostView={hostView} 
        documents={info.files ? info.files : info.host?.files} 
        setActiveDocumentHandler={setActiveDocumentHandler}
        updateRoom={fetchRoomInfo}
        deleteFile = {deleteFile}
        />}
      {activeDocument && <SelectedDocument document={activeDocument} activeURL={activeURL}/>}
      <Chatbox />
    </div>
  );
}

export default Room;