import React, { useState, useEffect } from 'react';

function SelectedDocument ({ activeURL, document }){
  
  const [url, setURL] = useState(activeURL);
  
  
  return (
    <div className="doc-container">
      <h1 className="doc-header">{document.replace(/.*?_/, '').replace(/\.[^/.]+$/, '')}</h1>
      {activeURL && <iframe
        src={activeURL} 
        height="1000px"
        width="auto"/>}
    </div>  
  );

}

export default SelectedDocument;