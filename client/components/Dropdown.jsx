import React, {useState, useEffect} from 'react';

function Dropdown ({documents, setActiveDocumentHandler}) {
  
  const [filesHash, setFilesHash] = useState({});

  useEffect(() => {
    const res = {};

    if (documents?.length) {
      for (const document of documents) {

        //Create a key with the characters and underscore at the beginning of document name removed
        const key = document.replace(/.*?_/, '');

        //Set the created key and original document name as key value pairs in the filesHash object
        res[key] = document;
      }
      setFilesHash(res);
    }
  }, [documents]);
  
  return (    
    <div>
      <label htmlFor="file-selector"> Choose a file to upload: </label>
      <select name="user-files" id="file-selector" onChange={(e) => setActiveDocumentHandler(e.target.value)}>
        <option value="">---Please Choose an Option--</option>
        {Object.entries(filesHash)?.map(pair => <option key={pair[1]} value={pair[1]}>{pair[0]}</option>)}
      </select>
    </div>

    
  );}
export default Dropdown;