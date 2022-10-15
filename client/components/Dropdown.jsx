import React from 'react';

function Dropdown (props) {
    const files = ['File1', 'FILE2', 'File3', 'File4', 'File5'];
  return (    
    <div>
      <label htmlFor="file-selector"> Choose a file to upload: </label>
      <select name="user-files" id="file-selector" onChange={(e) => console.log(e.target.value)}>
        <option value="">---Please Choose an Option--</option>
        {files.map(file => <option key={file} value={file}>{file}</option>)}
      </select>
    </div>

    
  );}
export default Dropdown;