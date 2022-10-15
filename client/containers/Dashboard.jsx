import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// components
import Login from '../components/Login';
import MainNav from '../components/MainNav';
import SettingsCard from '../components/SettingsCard';
import SubjectNav from '../components/SubjectNav';
import Profile from './Profile';
import Room from './Room';
import RoomContainer from './RoomContainer';
import SettingsContainer from './SettingsContainer';
import ActiveRooms from '../components/ActiveRooms';

function Dashboard( ) {
  const [subject, setSubject] = useState('');
  const [loggedIn, setLoggedIn] = useState(true);

  const verifyLogin = async () => {
    const logged = await fetch('/api/auth/verify').then(response => response.json());
    setLoggedIn(logged);
  };

  // check session if dashboard remounts
  useEffect(() => {
    verifyLogin();
  }, []);

  const noSubject = <div className='active-rooms-container'><ActiveRooms /></div>;
  // const noSubject = <p id='no-subject' className='warning'>Please select a subject!</p>;
  const yesSubject = <RoomContainer id={loggedIn._id} subject={subject} username={loggedIn.username}/>;

  return (
    <div>
      <div id='dashboard'>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>} />
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
              <Route path='/settings' element={<div id='main-container'>
                <SettingsContainer />
                <div id="login-details-container">
                  <SettingsCard/>
                </div>
              </div>}/>
              <Route path='/room' element={<Room />} />
            </Routes>
          </>} />}
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;