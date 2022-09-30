import React, { useState, useContext } from 'react';

function Nav({ subject, setSubject }) {
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
        key={i}
        value={e}
        className='subject-links'
        onClick={(event) => handleClick(event.target.value)}>
        {e}
      </button>
    )
  })

  const handleClick = (value) => {
    // react router????
    setSubject(value)
  }

  return (
    <div className='navbar'>
      <button id='home-link'><h2>Home</h2></button>
      <button id='profile-link'><h2>Profile</h2></button>
      <button id='settings-link'><h2>Settings</h2></button>
      <h2>Subjects</h2>
      <div id='subject-links'>
        {subjectBtns}
      </div>

    </div>
  )
}

export default Nav;