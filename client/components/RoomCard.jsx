import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RoomCard( { info, id } ) {
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);

  // const textOnSubmit = event => {
  //   event.preventDefault();
  //   setName((prevName) => {return newName})
  // }

  // function handleChange() {
  //   newName = event.target.value
  //   return event.target.value
  // }

  async function saveRoom () {
    const options = {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'savedRooms': `${info._id}`})};
    await fetch(`/api/users/saveroom`, options);
    console.log("Room Saved!");
  }

  const showRoomInfo = event => {
    setRoomInfoBoolean(!roomInfoBoolean);
  };

  const mainRoom = (
    <div className="mainRoom">
      <h1>
        <div>
          {info.host.username} Room
          <InfoIcon fontSize="small" onClick={showRoomInfo}></InfoIcon>
        </div>
      </h1>
      {/* <form>
        <input id="nameInput" type="text" placeholder="Your Name Here" onChange={handleChange}></input>
        <button id="onSubmitButton" onClick={textOnSubmit}>Enter</button>
        <button id="showRoomInfo" onClick={showRoomInfo}>Show Room Info</button>
      </form> */}
    </div>
  );

  const roomInfo = (
    <div className="roomInfo">
      <p>Subject: {info.subject} </p>
      <p>Creator:  {info.host.username} </p>
      <p>People Inside:  {info.allowedUsers} </p>
      <Link to='/main/room' state={{ info }}><Button variant='contained'>Join Room</Button></Link>
      <Button variant='contained' id="saveMyRoom" onClick={saveRoom}>Save</Button>
      <Button id="exitRoomInfo" onClick={showRoomInfo}>Back</Button>
    </div>
  );

  if (!roomInfoBoolean) {
    return mainRoom;
  } else if (roomInfoBoolean) {
    return roomInfo;
  }
}

export default RoomCard;