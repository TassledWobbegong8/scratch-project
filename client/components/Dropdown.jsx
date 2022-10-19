
import React, { useState, useEffect } from 'react';
import { NextPlan } from '@mui/icons-material';


const Dropdown = ({subjectList, setSubjectList,sub, setSub }) => {

  const chooseSub = async (event) => {
    setSub(event.target.value);
    try {
      const list = await fetch('api/home', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      })
      const  newList = await list.json();
      console.log(newList);
    }
    catch (err) {
      console.log(err);
    }
  };

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

