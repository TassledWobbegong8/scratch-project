import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

const ActiveRooms = () => {
  const [rooms, setRooms] = useState([]);
  const fetchRooms = async () => {
    // GET request to server api endpoint with subject in params
    const roomData = await fetch('/api/rooms/allRooms').then(response => response.json());
    if(Array.isArray(roomData)) setRooms(roomData);
    else setRooms([]);
  };

  useEffect(() => {
    fetchRooms();
  }, []);



  // const [ Test1, Test2, Test3, Test4, Test5, Test6, , Test7, Test8] = 'Testing';
  // const rooms = [Test1, Test2, Test3, Test4, Test5, Test6, Test7, Test8];

  return (

    /* container */
    <div className='curr-active-rooms'>
      <h1>Current Active Rooms</h1>
      {/* grid item */}
      <div className='grid-container'>
        {rooms.map((rooms, i) => (
          <div className='grid-item' key={i}>
            <div className='grid-item-front'>
              <p>Room {i + 1}</p>
              {/* we want to add description of room but make the font smaller */}
              {/* <p>{rooms.host.nickname}&apos;s {rooms.subject} Room</p> */}

              <a href='/main/home'>
                <button className='join-btn'>JOIN</button>
              </a>

            </div>
            {/* hover effect */}
            {/* <div className='grid-item-back'>
              <h2>Testing Card: Back</h2>
              <div className='hover-btns'>
                <a href='/main/home'>
                  <button>Join Room</button>
                </a>
              </div>
            </div> */}
          </div>
        ))}

      </div>

    </div>
  );
};

export default ActiveRooms
