import React, { useState, useContext } from 'react';

function SubjectNav({ subject, setSubject }) {
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
    <div className='subject-nav'>
      <h2>Subjects</h2>
      <div id='subject-links'>
        {subjectBtns}
      </div>

    </div>
  )
}

export default SubjectNav;