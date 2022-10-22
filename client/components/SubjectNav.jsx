import { Button } from '@mui/material';
import { Calculate, Book, HistoryEdu, Language, School, Science } from '@mui/icons-material';
import React, { useState, useContext } from 'react';
import mathImg from '../assets/math.png';
import englishImg from '../assets/english.png';
import historyImg from '../assets/History.png';
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
        sx= {{ textTransform: 'capitalize',
          textAlign: 'right',
          fontSize: '20px'}}
        variant='text'
        key={i}
        value={e[0]}
        id='theme'
        onClick={(event) => {handleClick(event.target.value); console.log('target',event.target);}}
        style={{backgroundImage:`url(${subjectImgs[i]})`}}>
        {/* {e[1]} */}
        {/* {e[0]} */}
      </Button>
    );
  });

  const handleClick = (value) => {
    // react router????
    setSubject(value);
  };

  return (
    <div className='subject-nav'>
      <div id='subject-links-container'>
        {subjectBtns}
      </div>

    </div>
  );
}

export default SubjectNav;