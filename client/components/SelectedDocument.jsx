import React, { useState, useEffect } from 'react';

function SelectedDocument (props){
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchFromAWS = async (documentName) => {
      const response = await fetch(`https://localhost:3000/api/uploads/${documentName}`);
      if (response.ok) {
        const url = await response.json();
        setUrl(url);
      }};
    fetchFromAWS(props.document);
  }, [props.document]);

  
  return (
    <div>
      <h1>this is the selected document</h1>
      {url && <img src={url}/>}
    </div>  
  );

}

export default SelectedDocument;