import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// components
import MainNav from '../components/MainNav';
import SubjectNav from '../components/SubjectNav';
import RoomContainer from './RoomContainer';
import Profile from './Profile';
import SettingsContainer from './SettingsContainer';
import SettingsCard from '../components/SettingsCard';
import Login from '../components/Login';
import Room from './Room';
import FlashContainer from './FlashContainer';
import Flashcard from '../components/Flashcard';

function Dashboard( ) {
  //Using React hooks, declare new state variables 'subject' and 'loggedIn'
  const [subject, setSubject] = useState('');//the initial state of subject is set to an empty string
  const [loggedIn, setLoggedIn] = useState(true);//the initial state  of logged in is set to boolean true

  const verifyLogin = async () => {
    const logged = await fetch('/api/auth/verify').then(response => response.json());
    console.log(logged, !logged && 'You are not logged in');
    setLoggedIn(logged);
  };

  // check session if dashboard remounts
  useEffect(() => {
    verifyLogin();
  }, []); //Run this once at the beginning

  const noSubject = <p id='no-subject' className='warning'></p>;
  const yesSubject = <RoomContainer id={loggedIn._id} subject={subject}/>;

  return (
    <div id='dashboard'>
      <Routes>
        <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
        {loggedIn && <Route path="/main/*" element={<>
          <MainNav setSubject={setSubject} setLoggedIn={setLoggedIn} />
          <Routes>
            <Route path='/home' element={
              <div id='main-container'>
                <SubjectNav subject={subject} setSubject={setSubject} />
                {!subject ? noSubject : yesSubject}
              </div>}
            />
            <Route path='/profile' element={<Profile />} />
            {/* created new path to flashcard feature */}
            <Route path='/flashcard' element={<FlashContainer />} />
            <Route path='/settings' element={<div id='main-container'>
              <SettingsContainer />
              <div id="login-details-container">
                <SettingsCard/>
              </div>
            </div>} />
            
            <Route path='/room' element={<Room />} />
          </Routes>
        </>} />}
        <Route path="*" element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}

export default Dashboard;