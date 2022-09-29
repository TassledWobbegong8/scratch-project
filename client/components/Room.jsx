import React, { useState, useEffect, useContext } from "react";

function Room() {
  const [name, setName] = useState("Lewis Lin");
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);
  let newName;

  const textOnSubmit = event => {
    event.preventDefault();
    setName((prevName) => {return newName})
  }

  function handleChange() {
    newName = event.target.value
    return event.target.value
  }

  const showRoomInfo = event => {
    setRoomInfoBoolean((prevBoolean) => {return !prevBoolean})
  }

  const mainRoom = (
    <div>
      <h1>
        This is {name}'s Room!
      </h1>
      <form>
        <input id="nameInput" type="text" placeholder="Your Name Here" onChange={handleChange}></input>
        <button id="onSubmitButton" onClick={textOnSubmit}>Enter</button>
        <button id="showRoomInfo" onClick={showRoomInfo}>Show Room Info</button>
      </form>
    </div>
  )

  const roomInfo = (
    <div>
      <p>Room Number:</p>
      <p>Subject:</p>
      <p>Creator:</p>
      <p>People Inside:</p>
      <button id="exitRoomInfo" onClick={showRoomInfo}>X</button>
    </div>
  )

  if (!roomInfoBoolean) {
    return mainRoom;
  } else if (roomInfoBoolean) {
    return roomInfo;
  }
}

export default Room