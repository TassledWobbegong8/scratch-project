import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    await formData.append('file', file);

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // const response = await fetch('http://localhost:3000/api/uploads', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    // });

    const response = await axios.post('http://localhost:3000/api/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data'},
    });
    
    console.log(response);
  };

  return (
    <form onSubmit={submit} >
      <input type="file" name="file" onChange={e => setFile(e.target.files[0])}/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default FileUpload;