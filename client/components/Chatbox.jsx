import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { io } from 'socket.io-client';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

const socket = io('http://localhost:3000');

function Chatbox(props) {
  //Room State
  //const [room, setRoom] = useState("");

  const [cookies, setCookie] = useCookies();

  const [username, setUsername] = useState('');

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [isConnected, setIsConnected] = useState(socket.connected);

  // message history is array of objects consisting of message body property and received which is boolean to
  // indicate if message was received or sent
  const [messageHistory, setMessageHistory] = useState([]);

  const sendMessage = () => {
    // emit event to server
    // console.log('msgObj roomId -->', cookies.roomId)
    const messageObj = { message, room: props.room, user: username };
    socket.emit('send_message', messageObj);

    // append message object as sent message to messageHistory for rendering
    setMessageHistory((state) => {
      const newHistory = [...state, messageObj];
      return newHistory;
    });
  };

  // separate useEffect to join room chat on component render
  useEffect(() => {
    console.log('chatbox useeffect')
    // get the user info off jwt cookie
    const decoded = jwt_decode(cookies.ssid);
    setUsername(decoded.username);
    socket.emit('join_room', props.room);
  
  }, []);

  // useEffect listening to socket events containing socket listener for received messeages events to append to message history
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageHistory((state) => {
        const newHistory = [...state, data];
        return newHistory;
      });
    });
  }, [socket]);

  const messages = messageHistory.map((e, i) => {
    return <p key={i}>{e.user}: { e.message }</p>;
  });

  return (
    <div className="chatbox">
      {console.log('chatbox renders')}
      <div id="message-container">{messages}</div>
      <form>
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        ></input>
        <Button variant="text" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default Chatbox;