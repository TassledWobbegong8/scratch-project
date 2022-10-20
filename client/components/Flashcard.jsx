
import React, { useState, useEffect } from "react";

const Flashcard = ({ sub, subjectList,questions }) => {
  
  
  return (
    <div className="flashcard">
      <p className='question'>{questions[0][0]}</p>
      <button className="flashbutton">previous</button>
      <button className="flashbutton">next</button>
      
    </div>
  );
};

export default Flashcard;