import React, { useState, useEffect, useContext } from "react";

function Room() {
  const [name, setName] = useState("Lewis Lin");
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);

  const textOnSubmit = event => {
    setName((prevName) => {return event.target.value})
  }

  const showRoomInfo = event => {
    setRoomInfoBoolean((prevBoolean) => {return !prevBoolean})
  }

  const mainRoom = (
    <div>
      <h1>
        This is {name}'s Room!
      </h1>
      <input id="nameInput", type="text" placeholder="Your Name Here">
        <input type="submit" id="onSubmitButton" onSubmit={textOnSubmit} value="Enter"></input>
      </input>
      <button id="showRoomInfo" onClick={showRoomInfo}>Show Room Info</button>
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
    return mainRoom
  } else if (roomInfoBoolean) {
    return roomInfo;
  }
}

export default Room