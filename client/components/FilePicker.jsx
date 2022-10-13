import { Button } from '@mui/material';
import React, { useState } from 'react';

function FilePicker({ fileList, setDocument }) {
  const [file, setFile] = useState(null);
  const [selected, setSelect] = useState(false);

  const files = fileList.map(e => {
    return <option key={e.id} value={e.name} />;
  });

  const selectFile = async () => {
    setSelect(true);
    const fileContents = await fetch('/access_docs', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(file)
    });
    setDocument(fileContents);
  };

  return (
    <div className='file-picker'>
      <input list='files' onChange={event => setFile(event.target.key)} />
      <datalist id='files'>
        {files}
      </datalist>
      <Button variant='contained' onClick={() => selectFile()}>Select File</Button>
    </div>
  );
}

export default FilePicker;