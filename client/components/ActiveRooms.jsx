import React from 'react';
import { Link } from 'react-router-dom';

const ActiveRooms = () => {

  const [ Test1, Test2, Test3, Test4] = 'Testing';
  const rooms = [Test1, Test2, Test3, Test4];

  return (

    /* container */
    <div className='curr-active-rooms'>
      <h1>Current Active Rooms</h1>
      {/* grid item */}
      <div className='grid-container'>
        {rooms.map((rooms, i) => (
          <div className='grid-item' key={i}>
            <div className='grid-item-front'>
              Heres some text
            </div>
            {/* hover effect */}
            <div className='grid-item-back'>
              <h2>Testing Card: Back</h2>
              <div className='hover-btns'>
                <a href='/main/home'>
                  <button>Join Room</button>
                </a>
              </div>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ActiveRooms
