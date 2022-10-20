import React, { useState, useEffect } from 'react';
import FlashCard from '../components/Flashcard';
import Dropdown from '../components/Dropdown';
import flashdata from './flashdata';
import '../stylesheets/flash.scss';
import Axios from 'axios';


const FlashContainer = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [sub, setSub] = useState(flashdata[0].subject);
  const [questions, setQuestions] = useState(flashdata[0].questions);

  const loadSubjects = async (event) => {
    //const subject = event.target.value;
    try {
      Axios.get('/api/home')
        .then(res => console.log(res));
    }
    catch (err) {
      console.log(err);
    }
  };

  // const findQuestions = (sub) => {
  //   for (let obj in subjectList) {
  //     if (obj.subject === sub) {
  //       setQuestions(obj.questions);
  //       console.log(questions);
  //     }
  //   }
  // };


  useEffect(() => {
    //loadSubjects();
    setSubjectList(flashdata);
    //findQuestions(sub);
  }, []);
    
  return (
    <section className="flashcontainer">
      <div className="topbutton">
        <Dropdown subjectList={subjectList} setSub={setSub} questions={ questions} setQuestions = {setQuestions} />
        <button>add</button>
      </div>
      <div className="questionindex">1/10</div>
      <FlashCard sub={sub} subjectList={subjectList} questions={ questions} />
    </section>
  );
};

export default FlashContainer;
