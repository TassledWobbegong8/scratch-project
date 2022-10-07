import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import FilePicker from './FilePicker';

function DocumentEditor({ hostView }) {
  const [openPicker, setPicker] = useState(false);

  const connectAuth = async () => {
    // request oauth url from server
    const redirectURL = await fetch('/auth').then(response => response.json());
    // redirect user to consent screen
    window.location.replace(redirectURL);
  };


  return (
    <div className='doc-editor'>
      {hostView ? 
        <Button onClick={() => connectAuth()}>Choose a Google Drive File</Button>
        : 'host document here'}
    </div>
  );
}

export default DocumentEditor;