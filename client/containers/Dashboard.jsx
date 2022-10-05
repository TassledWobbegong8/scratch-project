import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNav from '../components/MainNav';
import SubjectNav from '../components/SubjectNav';
import RoomContainer from '../containers/RoomContainer';
import Profile from './Profile';
import SettingsContainer from './SettingsContainer';
import SettingsCard from '../components/SettingsCard';
import Login from '../components/Login';

function Dashboard( ) {
  const [subject, setSubject] = useState('');

  const noSubject = <h2 id='no-subject' className='warning'>Please select a subject!</h2>;

  const yesSubject = <RoomContainer subject={subject}/>;

  return (
    <div id='dashboard'>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/main/*" element={<>
          <MainNav setSubject={setSubject}/>
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
          </Routes>
        </>}>
        </Route>
      </Routes>
    </div>
  );
}

export default Dashboard;