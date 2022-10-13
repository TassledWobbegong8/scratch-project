import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
// import io from '../../server/server.js';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

function Chatbox() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  // message history is array of objects consisting of message body property and received which is boolean to
  // indicate if message was received or sent
  const [messageHistory, setMessageHistory] = useState([]);

  const sendMessage = () => {
    // emit event to server
    socket.emit('send_message', message );

    // append message object as sent message to messageHistory for rendering
    setMessageHistory(state => { 
      const newHistory = [...state, message];
      return newHistory;
    });
  };
  
  
  //const [messageList, setMessages] = useState(fakeMessages);
  // need function to retrieve messages

  useEffect(() => {
    socket.on('receive_message', (data) => {

      setMessageHistory(state => {
        const newHistory = [...state, data];
        return newHistory;
      });
    });
  }, [socket]);

  const messages = messageHistory.map((e, i) => {
    return (
      <p key={i}>
        {e}
      </p>
    );
  });

  return (
    <div className='chatbox'>
      <div id='message-container'>
        {console.log(messageHistory)}
        {messages}
      </div>
      <form>
        <input type='text' value={message} onChange={(event) =>{setMessage(event.target.value);}}></input>
        <Button variant='text' onClick={sendMessage}>Send</Button>
      </form>
    </div>
  );
}

export default Chatbox;