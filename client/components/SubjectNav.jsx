import { Button } from '@mui/material';
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
      <Button variant='outlined'
        key={i}
        value={e}
        id='subject-links'
        onClick={(event) => handleClick(event.target.value)}>
        {e}
      </Button>
    )
  })

  const handleClick = (value) => {
    // react router????
    setSubject(value)
  }

  return (
    <div className='subject-nav'>
      <h2 style={{"textAlign": "center"}}>Subjects</h2>
      <div id='subject-links-container'>
        {subjectBtns}
      </div>

    </div>
  )
}

export default SubjectNav;