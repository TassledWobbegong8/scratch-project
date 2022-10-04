import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNav from '../components/MainNav';
import SubjectNav from '../components/SubjectNav';
import RoomContainer from '../containers/RoomContainer';
import Profile from './Profile';
import SettingsContainer from './SettingsContainer';
import SettingsCard from '../components/SettingsCard';

function Dashboard() {
  const [subject, setSubject] = useState('');

  const noSubject = <h2></h2>

  const yesSubject = <RoomContainer subject={subject}/>

  return (
    <div id='dashboard'>
      <MainNav setSubject={setSubject}/>
      <Routes>
        <Route path='/' element={<div id='main-container'>
          <SubjectNav subject={subject} setSubject={setSubject} />
          {!subject ? noSubject : yesSubject}
        </div>}
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<div id='main-container'>
          <SettingsContainer />
          <div id="login-details-container">
            {SettingsCard()}
          </div>
        </div>}/>
      </Routes>
    </div>
  )
}

export default Dashboard;