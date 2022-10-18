import React, { useState, useEffect } from 'react';

function SelectedDocument ({ activeURL }){
  
  const [url, setURL] = useState(activeURL);

  console.log('selectdocument component ', activeURL);
  return (
    <div>
      <h1>this is the selected document</h1>
      {activeURL && <img src={activeURL}/>}
    </div>  
  );

}

export default SelectedDocument;