import React, { useState, useEffect } from 'react';
import FlashCard from '../components/Flashcard';
import Dropdown from '../components/Dropdown';
import flashdata from './flashdata';
import '../stylesheets/flash.scss';



const FlashContainer = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [sub, setSub] = useState(flashdata[0].subject);

  useEffect(() => {
    setSubjectList(flashdata);
  }, []);
    
  return (
    <section className="flashcontainer">
      <div className="topbutton">
        <Dropdown subjectList={subjectList} setSubjectList={setSubjectList} sub={sub} setSub={setSub} />
        <button>add</button>
      </div>
      <div className="questionindex">1/10</div>
      <FlashCard sub={sub} subjectList={subjectList} />
    </section>
  );
};

export default FlashContainer;
