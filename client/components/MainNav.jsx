import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function MainNav() {
  return (
    <div className='main-nav'>
      <Link className='main-nav-btn' to='/'><Button variant="text" id='home-link'>Home</Button></Link>
      <Link className='main-nav-btn' to='/profile'><Button variant="text" id='profile-link'>Profile</Button></Link>
      <Link className='main-nav-btn' to='/settings'><Button variant="text" id='settings-link'>Settings</Button></Link>
      <Link className='main-nav-btn' id='logout-link' to='/logout'><Button variant="text" id='logout-link' sx={{float: "right"}}>Logout</Button></Link>
    </div>
  )
};

export default MainNav;