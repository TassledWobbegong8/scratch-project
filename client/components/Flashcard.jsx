
import React, { useState, useEffect } from 'react';


const Flashcard = ({ sub, subjectList, questions, setQuestions,index, setIndex }) => {
  const [flip, setFlip] = useState(0);
 
  const handleClick = () => {
    if (flip === 0) setFlip(1);
    else setFlip(0);
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
   
    <div className="flip-box">
      <div className="flip-box-inner">
        <div className="flip-box-front">
          <h2 className='flashh2'> Question</h2>
          <p className = 'flashcardtext'> {questions[index][0]}</p>
        </div>
        <div className="flip-box-back">
          <h2 className='flashh2'>Answer</h2>
          <p className = 'flashcardtext'>{ questions[index][1]}</p>
        </div>
      </div>
    </div>




    
  // <div className="flip-box">
  //   <div className="flip-box-inner">
  //     <div className="flip-box-front">
  //       <p className='question'>{questions[index][0]}</p>
  //       <button onClick = {handleClick} ><MdCached /></button>
  //       <div>
  //         <div className="flip-box-back">
  //           <h2>Answer</h2>
  //           <p className='question'>{questions[index][1]}</p>
  //   </div>
  // <button className="flashbutton" onClick = {previous}><IoChevronBack /></button>
  // <button className="flashbutton" onClick = {next}><IoChevronForward /></button>
  // </div>
  //     </div>
  //   </div>
  // </div>
    
  );
};

export default Flashcard;