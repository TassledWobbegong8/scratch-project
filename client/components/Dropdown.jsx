
import React, { useState, useEffect } from 'react';
import { NextPlan } from '@mui/icons-material';
import Axios from 'axios';


const Dropdown = ({subjectList, setSubjectList,sub, setSub }) => {

  const chooseSub = async (event) => {
    const subject = event.target.value;
    try {
      Axios.post('/api/home', { subject })
        .then(res => console.log(res.data[0].questions[0][0]));
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

