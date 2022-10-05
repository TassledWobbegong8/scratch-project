import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function MainNav({ setSubject, logout }) {
  return (
    <div className='main-nav'>
      <Link className='main-nav-btn' to='/main/home'><Button onClick={() => setSubject('')} variant="text" id='home-link'>Home</Button></Link>
      <Link className='main-nav-btn' to='/main/profile'><Button variant="text" id='profile-link'>Profile</Button></Link>
      <Link className='main-nav-btn' to='/main/settings'><Button variant="text" id='settings-link'>Settings</Button></Link>
      <Link className='main-nav-btn' to='/' id='logout-link'><Button onClick={() => logout()} variant="text" id='logout-link' sx={{float: 'right'}}>Logout</Button></Link>
    </div>
  );
}

export default MainNav;