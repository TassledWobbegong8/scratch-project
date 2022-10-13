import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function MainNav({ setSubject, setLoggedIn }) {
  const logOut = async () => {
    const cookie = await fetch('/api/auth/logout').then(response => response.json());
    setLoggedIn(false);
  };

  return (
    <div className='main-nav'>
      <p className='logo'>stud<span>if</span>y</p>
      <Link className='main-nav-btn' to='/main/home'><Button onClick={() => setSubject('')} variant="text" id='home-link'>Home</Button></Link>
      <Link className='main-nav-btn' to='/main/profile'><Button variant="text" id='profile-link'>Profile</Button></Link>
      <Link className='main-nav-btn' to='/main/settings'><Button variant="text" id='settings-link'>Settings</Button></Link>
      <div className='logoutbtn'>
        <Link className='main-nav-btn' to='/' id='logout-link'><Button onClick={logOut} variant="text" id='logout-link' sx={{float: 'right'}}>Logout</Button></Link>
      </div>
    </div>
  );
}

export default MainNav;