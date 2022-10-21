import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

function MainNav({ setSubject, setLoggedIn }) {
  const logOut = async () => {
    const cookie = await fetch('/api/auth/logout').then(response => response.json());
    setLoggedIn(false);
  };

  return (
    <div className='main-nav'>
      <p className='logo'>stud<span>if</span>y</p>
      <Link className='main-nav-btn' to='/main/home'><Button onClick={() => setSubject('')} variant="text" id='home-link'> <HomeIcon fontSize="22px"/>  Home</Button></Link>
      <Link className='main-nav-btn' to='/main/profile'><Button variant="text" id='profile-link'><PersonIcon fontSize="22px" margin="5px" /> Profile</Button></Link>
      {/* added link to flashcard feature */}
      <Link className='main-nav-btn' to='/main/flashcard'><Button variant="text" id='settings-link'><AutoStoriesOutlinedIcon fontSize="22px" /> Flashcard</Button></Link>
      <Link className='main-nav-btn' to='/main/settings'><Button variant="text" id='settings-link'><SettingsIcon fontSize="22px" /> Settings</Button></Link>
      <Link className='main-nav-btn' to='/' id='logout-link'><Button onClick={logOut} variant="text" id='logout-link' sx={{float: 'right'}}> <LogoutIcon fontSize="22px"/>Logout</Button></Link>
    </div>
  );
}

export default MainNav;