import React, { useState } from 'react';
import Nav from '../components/Nav';
import RoomContainer from '../containers/RoomContainer';

function Dashboard() {
  const [subject, setSubject] = useState('');

  const noSubject = <h2>Please Select a Subject</h2>

  const yesSubject = <RoomContainer subject={subject}/>

  return (
    <div id='dashboard'>
      <Nav subject={subject} setSubject={setSubject} />
      {!subject ? noSubject : yesSubject}
    </div>
  )
}

export default Dashboard;