import React from 'react';
import Nav from './Nav';
import RoomContainer from '../containers/RoomContainer';

function App() {
  return (
    <div className='app-container'>
      <Nav />
      <RoomContainer />
    </div>
  )
}

export default App;