import { Button } from '@mui/material';
import { Calculate, Book, HistoryEdu, Language, School, Science } from '@mui/icons-material';
import React, { useState, useContext } from 'react';
import mathImg from '../assets/math.png';
import englishImg from '../assets/english.png';
import historyImg from '../assets/history.png';
import scienceImg from '../assets/science.png';
import langImg from '../assets/language.png';
import miscImg from '../assets/misc.png';


function SubjectNav({ subject, setSubject }) {
  // navbar will send back new subject as updated state via useContext
  const subjectObj = {
    'math': <Calculate className='subject-link-icon'/>,
    'english': <Book className='subject-link-icon'/>,
    'history': <HistoryEdu className='subject-link-icon'/>,
    'science': <Science className='subject-link-icon'/>,
    'languages': <Language className='subject-link-icon'/>,
    'miscellaneous': <School className='subject-link-icon'/>
  };

  const subjects = Object.entries(subjectObj);

  const subjectImgs = [mathImg,englishImg,historyImg, scienceImg,langImg, miscImg];

  const subjectBtns = subjects.map((e, i) => {
    return (

      <Button 
        variant='text'
        key={i}
        value={e[0]}
        id='subject-links'
        onClick={(event) => handleClick(event.target.value)}>
        <img className='subject-img' src= {subjectImgs[i]} alt="subject image"></img>
        {e[0]}
        {/* {e[1]} */}
      </Button>
    );
  });

  const handleClick = (value) => {
    // react router????
    setSubject(value);
  };

  return (
    <div className='subject-nav'>
      <h3 ></h3>
      <div id='subject-links-container'>
        {subjectBtns}
      </div>

    </div>
  );
}

export default SubjectNav;