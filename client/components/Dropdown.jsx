
import React, { useState, useEffect } from 'react';


const Dropdown = ({subjectList, setSubjectList,sub, setSub }) => {

  const chooseSub = (event) => {
    setSub(event.target.value);
    
  }

  return (
    <form >
      <label>
        <select onChange={chooseSub}>
          {subjectList.map((sub,index) => <option value={sub.subject} key = {index}>{sub.subject}</option>)}
        </select>
      </label>
    </form>
  );
};

export default Dropdown;

