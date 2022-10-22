import { Button } from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import SchoolIcon from '@mui/icons-material/School';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RoomCard({ info, currentUserId, id }) {
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);
  const [saved, setSaved] = useState(false);
  const [requested, setRequested] = useState(false);

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

  //capitalize the first letter of a nickname
  const capitalizedNickname = (string) => {
    return string[0].toUpperCase() + string.substring(1);
  };

  //checks if current user is in room's allowed user list
  const ableToJoin = (userInfoObject) => {
    if (userInfoObject.classroom) {
      return userInfoObject.allowedUsers
        .map((e) => e._id)
        .includes(currentUserId);
    }
    return true;
  };

  const isPendingRequest = (userInfoObject) => {
    return userInfoObject.pendingUsers
      .map((e) => e._id)
      .includes(currentUserId);
  };

  //sends a request to the host to add current user to a room
  const requestJoin = async () => {
    const options = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentUserId: currentUserId }),
    };
    await fetch(`/api/rooms/addUser/${info._id}`, options);
    console.log("Added current user to room's pending list");
    setRequested(true);
  };

  //what a roomcard looks like before it is clicked
  //uses a school icon if it's a classroom
  //uses a meeting icon if it's a regular room
  const mainRoom = (
    <div className="mainRoom" onClick={showRoomInfo}>
      {capitalizedNickname(info.host.nickname).concat(
        info.classroom ? "'s Classroom" : "'s Room"
      )}

      {info.classroom ? (
        <SchoolIcon className="schoolIcon" fontSize="medium"></SchoolIcon>
      ) : (
        <MeetingRoomIcon
          className="meetingRoomIcon"
          fontSize="medium"></MeetingRoomIcon>
      )}
    </div>
  );

  const joinRoom = (
    <Link to="/main/room" state={{ info }}>
      <Button variant="contained">Join Room</Button>
    </Link>
  );
  const requestRoom = (
    <Button variant="contained" onClick={requestJoin}>
      Request to Join
    </Button>
  );

  const pendingRequest = <Button variant="contained">Pending Request</Button>;

  const roomInfo = (
    <div className="roomInfo">
      {info.classroom ? <h3>Classroom</h3> : <h3>Room</h3>}
      <p>
        <span>Subject: </span>
        {info.subject.toUpperCase()}
      </p>
      <p>
        <span>Creator: </span>
        {info.host.username}
      </p>
      <div id="main-button">
        {ableToJoin(info)
          ? joinRoom
          : requested || isPendingRequest(info)
          ? pendingRequest
          : requestRoom}
        {!saved && (
          <Button 
            style={{
              backgroundColor: '#5aa069',
              padding: '10px 18px',
              fontSize: '14px'
            }}
            variant="contained" id="saveMyRoom" onClick={saveRoom}>
            Save
          </Button>
        )}
        {saved && (
          <Button 
            style={{
              color: '#5aa069',
              padding: '10px 18px',
              fontSize: '14px'
            }}variant="outlined" id="saveMyRoom">
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
