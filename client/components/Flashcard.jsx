
import React, { useState, useEffect } from "react";

const Flashcard = ({ sub, subjectList }) => {
  
  
  return (
    <div className="flashcard">
      <p className='question'>this question is about {sub}</p>
      <button className="flashbutton">previous</button>
      <button className="flashbutton">next</button>
      
    </div>
  );
};

export default Flashcard;