import { Button } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SchoolIcon from '@mui/icons-material/School';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RoomCard({ info, id }) {
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveRoom() {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ savedRooms: `${info._id}` }),
    };
    await fetch('/api/users/saveroom', options);
    console.log('Room Saved!');
    setSaved(true);
  }

  const showRoomInfo = (event) => {
    setRoomInfoBoolean(!roomInfoBoolean);
  };

  const mainRoom = (
    <div className="mainRoom" onClick={showRoomInfo}>
      {console.log(info)}
      {info.host.nickname.concat(info.classroom ? `'s Classroom` : `'s room`)}
      {info.classroom ? (
        <SchoolIcon className="schoolIcon" fontSize="medium"></SchoolIcon>
      ) : (
        <MeetingRoomIcon
          className="meetingRoomIcon"
          fontSize="medium"></MeetingRoomIcon>
      )}
    </div>
  );

  const roomInfo = (
    <div className="roomInfo">
      <p>
        <span>Subject: </span>
        {info.subject.toUpperCase()}{' '}
      </p>
      <p>
        <span>Creator: </span>
        {info.host.username}{' '}
      </p>
      <p>
        <span>People Inside: </span>
        {info.allowedUsers}{' '}
      </p>
      <div id="main-button">
        <Link to="/main/room" state={{ info }}>
          <Button variant="contained">Join Room</Button>
        </Link>
        {!saved && (
          <Button variant="contained" id="saveMyRoom" onClick={saveRoom}>
            Save
          </Button>
        )}
        {saved && (
          <Button variant="outlined" id="saveMyRoom">
            Saved!
          </Button>
        )}
        <Button id="exitRoomInfo" onClick={showRoomInfo}>
          Back
        </Button>
      </div>
    </div>
  );

  if (!roomInfoBoolean) {
    return mainRoom;
  } else if (roomInfoBoolean) {
    return roomInfo;
  }
}

export default RoomCard;
