import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import FilePicker from './FilePicker';
import FileUpload from './FileUpload';
import Dropdown from './Dropdown';
import SelectedDocument from './SelectedDocument';
import { PropaneSharp } from '@mui/icons-material';

function DocumentEditor({ hostView, documents, setActiveDocumentHandler}) {
  // some fake data for rendering purposes
  const fakeFileList = ['test1', 'someDocument', 'my story'];

  const [openPicker, setPicker] = useState(false);
  const [fileList, setFiles] = useState(fakeFileList);
  const [document, setDocument] = useState({});


  const connectAuth = async () => {
    console.log('click auth');
    // first check to see if token is already in cookies
    const files = await fetch('/oauth/access_drive').then(response => response.json());

    if (files) {
      console.log(files);
      setPicker(true);
      return setFiles(files);
    }
    console.log('not authorized yet');
    // request oauth url from server
    const redirectURL = await fetch('/oauth').then(response => response.json());
    // redirect user to consent screen
    window.location.replace(redirectURL);
    // redirect should come back as an array with the files
    setFiles(await fetch('/oauth/access_drive').then(response => response.json()));
    setPicker(true);
  };

  //After login in Dashboard - fetch aws files for username and pass all the way to Dropdown
  //in Dashboard create a piece of state set to empty obj that stores info on the file
  //original name (to be rendered in dropdown)
  //our unique aws name with timestamp and username in that name
  //pull this information from fetch user request
  //convert aws filename to original name
  //[awsFileName,awsFileName, awsFileName]


  //In Dropdown have list of files to choose (edit so only original file name). After selection, update the state through setActiveDocument 

  //SelectedDocument pullls the updated setActiveDocument state, use that filename to reference obj in Dashboard
  //how to render in an iframe

  //have fileupload


  return (
    <div className='doc-editor'>
      {openPicker && <FilePicker fileList={fileList} setDocument={setDocument} />}
      {hostView && !openPicker && <Button onClick={() => connectAuth()}>Choose a Google Drive File</Button>}
      <FileUpload/>
      <Dropdown setActiveDocumentHandler={setActiveDocumentHandler} documents={documents}/>
    </div>
  );
}

export default DocumentEditor;