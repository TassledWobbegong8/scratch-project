import React, { useState, useEffect } from 'react';
import FlashCard from '../components/Flashcard';
import Dropdown from '../components/Dropdown';
import flashdata from './flashdata';
import { IoAddCircleOutline } from 'react-icons/io5';
import '../stylesheets/flash.scss';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';
import { MdCached } from 'react-icons/md';


const FlashContainer = () => {

  const [subjectList, setSubjectList] = useState([]);
  const [questions, setQuestions] = useState(flashdata[0].questions);
  const [sub, setSub] = useState(flashdata[0].subject);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [index, setIndex] = useState(0);
  const pop = document.getElementsByClassName('flashCardPopup')[0];

  const loadSubjects = async () => {
    try {
      fetch('/api/home')
        .then(res => res.json())
        .then(res => {
          console.log(res[0].questions);
          setSubjectList(res);
          setQuestions(res[0].questions);
          console.log(questions);
          
        });   
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
   
    loadSubjects();
    //setSubjectList(flashdata);
  }, []);

  const popup = () => {
    pop.style.display = 'block';
  };

  const submit = () => {
    pop.style.display = 'none';
    fetch('/api/home', {
      method: 'POST',
      body: JSON.stringify({
        subject: sub,
        questions: [...questions,[question,answer]],
      }),
      headers: {
        'Content-type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        setSubjectList(json);
      });
  };

  const cancel = () => {
    pop.style.display = 'none';
  };
  
  const previous = () => {
    if (index === 0) setIndex(questions.length - 1);
    else setIndex(index - 1);
  };
  const next = () => {
    if (index === questions.length - 1) setIndex(0);
    else setIndex(index + 1);
  };


  return (
    <section className="flashcontainer">
      <div className="flashCardPopup" >
        <input onChange={(event)=>setQuestion(event.target.value)}/>
        <input onChange={(event)=>setAnswer(event.target.value)}/>
        <button className="btn" onClick = {submit}>submit</button>
        <button className="btn" onClick = {cancel}>cancel</button>
      </div>
      <div className="topbutton">
        <Dropdown subjectList={subjectList} questions={questions} setQuestions = {setQuestions} setSub = {setSub} />
        <IoAddCircleOutline className = 'addbtn' onClick = {popup}/>
      </div>
      <div className="questionindex">{index + 1}/{questions.length}</div>
      <FlashCard subjectList={subjectList} questions={questions} setQuestions={setQuestions} index={index} setIndex={setIndex} />
    
      <button onClick = {previous} className = 'btn'><IoChevronBack className="flashbutton" /></button>
      <button onClick = {next} className = 'btn'><IoChevronForward className="flashbutton" /></button>


    </section>
  );
};


export default FlashContainer;
