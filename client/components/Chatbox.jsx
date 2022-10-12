import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
// import io from '../../server/server.js';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

function Chatbox() {

  
  
  //const [messageList, setMessages] = useState(fakeMessages);
  // need function to retrieve messages

  useEffect(() => {
    console.log("chatbox mounted");
    
  });

  return (
    <div className='chatbox'>
      <div id='message-container'>
        {/* {messages} */}
      </div>
      <form>
        <input type='text'></input>
        <Button variant='text'>Send</Button>
      </form>
    </div>
  );
}

export default Chatbox;