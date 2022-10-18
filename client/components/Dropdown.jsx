
import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const Dropdown = ({subjectList, setSubjectList,sub, setSub }) => {

  const chooseSub = async (event) => {
    setSub(event.target.value);
    try {
      const list = await Axios.get('/home',{subject:sub})
        .then((data) => console.log(data));
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

