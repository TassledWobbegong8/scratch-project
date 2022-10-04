import React, { useState, useEffect } from "react";
import Chatbox from "../components/Chatbox";
import DocumentEditor from "../components/DocumentEditor";

function Room({ id }) {
  const [roomDetails, setDetails] = useState({});

  const fetchRoomDetails = async () => {
    const details = await fetch(`/api/rooms/${id}`).then(response => response.json());
    setDetails(details);
  }

  useEffect(() => {
    fetchRoomDetails()
  }, [])

  return (
    <div className="room-page">
      <div id='room-page-info'>
        <h2>Host: {roomDetails.host}</h2>
      </div>
      <DocumentEditor />
      <Chatbox />
    </div>
  )
}

export default Room;