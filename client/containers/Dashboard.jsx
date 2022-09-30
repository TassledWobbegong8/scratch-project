import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainNav from '../components/MainNav';
import SubjectNav from '../components/SubjectNav';
import RoomContainer from '../containers/RoomContainer';
import Profile from './Profile';

function Dashboard() {
  const [subject, setSubject] = useState('');

  const noSubject = <h2>Please Select a Subject</h2>

  const yesSubject = <RoomContainer subject={subject}/>

  return (
    <div id='dashboard'>
      <MainNav />
      <Routes>
        <Route path='/' element={<>
          <SubjectNav subject={subject} setSubject={setSubject} />
          {!subject ? noSubject : yesSubject}
        </>}
        />
        <Route path='/profile' element={<Profile />} />
      </Routes>


    </div>
  )
}

export default Dashboard;