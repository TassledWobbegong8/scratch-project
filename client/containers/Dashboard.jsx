import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNav from '../components/MainNav';
import SubjectNav from '../components/SubjectNav';
import RoomContainer from '../containers/RoomContainer';
import Profile from './Profile';
import SettingsMenu from './SettingsMenu';

function Dashboard() {
  const [subject, setSubject] = useState('');

  const noSubject = <h2></h2>

  const yesSubject = <RoomContainer subject={subject}/>

  return (
    <div id='dashboard'>
      <MainNav />
      <Routes>
        <Route path='/' element={<div id='main-container'>
          <SubjectNav subject={subject} setSubject={setSubject} />
          {!subject ? noSubject : yesSubject}
        </div>}
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<SettingsMenu/>}/>
      </Routes>


    </div>
  )
}

export default Dashboard;