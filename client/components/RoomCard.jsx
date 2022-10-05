import { Button } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RoomCard( { info } ) {
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);

  // const textOnSubmit = event => {
  //   event.preventDefault();
  //   setName((prevName) => {return newName})
  // }

  // function handleChange() {
  //   newName = event.target.value
  //   return event.target.value
  // }

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
      <p>Room Number: </p>
      <p>Subject: </p>
      <p>Creator:  </p>
      <p>People Inside:  </p>
      <Link to='/main/room' state={{ info }}><Button variant='contained'>Join Room</Button></Link>
      <KeyboardReturnIcon id="exitRoomInfo" onClick={showRoomInfo}>X</KeyboardReturnIcon>
    </div>
  );

  if (!roomInfoBoolean) {
    return mainRoom;
  } else if (roomInfoBoolean) {
    return roomInfo;
  }
}

export default RoomCard;