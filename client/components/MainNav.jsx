import React from 'react';
import { Link } from 'react-router-dom';

function MainNav() {
  return (
    <div className='main-nav'>
      <Link to='/'><button id='home-link'><h2>Home</h2></button></Link>
      <Link to='profile'><button id='profile-link'><h2>Profile</h2></button></Link>
      <button id='settings-link'><h2>Settings</h2></button>
    </div>
  )
};

export default MainNav;