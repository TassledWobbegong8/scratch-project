import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RoomCard( { info, id, username } ) {
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);
  const [saved, setSaved] = useState(false);

  // const textOnSubmit = event => {
  //   event.preventDefault();
  //   setName((prevName) => {return newName})
  // }

  // create a new patch request function to add clicked user as "allowed user" to show all users in the room
  async function joinRoom () {
    console.log('this is logged in user id', username);
    const options = {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'allowedUsers': `${username}`})};
    await fetch('/api/users/saveroom', options);
  }


  // function handleChange() {
  //   newName = event.target.value
  //   return event.target.value
  // }

  async function saveRoom () {
    const options = {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'savedRooms': `${info._id}`})};
    await fetch('/api/users/saveroom', options);
    console.log('Room Saved!');
    setSaved(true);
  }

  const showRoomInfo = event => {
    setRoomInfoBoolean(!roomInfoBoolean);
  };

  const mainRoom = (
    <div className="mainRoom" onClick={showRoomInfo}>
      {/* <div > */}
      {/* <div>
          <img src='https://csunshinetoday.csun.edu/wp-content/uploads/Math4-web.jpg' width="192" height="144"/>
        </div> */}
      {info.host.nickname} Room
      {/* <InfoIcon fontSize="small" onClick={showRoomInfo}></InfoIcon> */}
      {/* </div> */}
      {/* <form>
        <input id="nameInput" type="text" placeholder="Your Name Here" onChange={handleChange}></input>
        <button id="onSubmitButton" onClick={textOnSubmit}>Enter</button>
        <button id="showRoomInfo" onClick={showRoomInfo}>Show Room Info</button>
      </form> */}
    </div>
  );

  const roomInfo = (
    <div className="roomInfo">
      <p><span>Subject:  </span>{info.subject.toUpperCase()} </p>
      <p><span>Creator:  </span>{info.host.username} </p>
      <p><span>People Inside: </span>{info.allowedUsers} </p>
      <div id='main-button'>
        <Link to='/main/room' state={{ info }}><Button variant='contained' onClick={joinRoom}>Join Room</Button></Link>
        {!saved && <Button variant='contained' id="saveMyRoom" onClick={saveRoom}>Save</Button>}
        {saved && <Button variant='outlined' id="saveMyRoom">Saved!</Button>}
        <Button id="exitRoomInfo" onClick={showRoomInfo}>Back</Button>
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