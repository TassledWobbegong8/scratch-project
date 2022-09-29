import React, { useState, useContext } from 'react';

function Nav() {
  const [subject, setSubject] = useState('');
  // navbar will send back new subject as updated state via useContext

  const subjects = [
    'MATH',
    'ENGLISH',
    'HISTORY',
    'SCIENCE',
    'LANGUAGES',
    'MISCELLANEOUS'
  ]
  const subjectBtns = subjects.map((e, i) => {
    return (
      <button 
        key='i' 
        value={e} 
        className='subject-links'
        onClick={handleClick}>
        {e}
      </button>
    )
  })
  
  const handleClick = (value) => {
    // handle react router behavior??
  }

  return (
    <div className='navbar'>
      <button id='home-link'><h2>Home</h2></button>
      <h2>Subjects</h2>
      <div id='subject-links'>
        {subjectBtns}
      </div>
        
    </div>
  )
}

export default Nav;