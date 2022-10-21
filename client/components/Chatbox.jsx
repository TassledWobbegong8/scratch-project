import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';

function Chatbox(props) {
  const [messagesArr, setMessageArr] = useState([{name: 'Lewis', body: 'yo!'}, {name: 'Peipei', body: 'bye'}]);

  const sendMessage = () => {
    const inputVal = document.getElementById('chatInput').value;
    fetch(`/api/rooms/update/${props.roomInfo._id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({messageList: [...messagesArr, {name: props.username, body: inputVal}]})
    });
  };

  useEffect(() => {
    setInterval(() => {
      fetch('/api/rooms/cookie')
        .then((data) => data.json())
        .then((data) => {
          if(data.messageList.length > messagesArr.length) {
            setMessageArr([...data.messageList]);
            console.log('interval');
          }
        });
    }, 1000);
  }, []);

  return (
    <div className='chatbox'>
      <div id='message-container'>
        {messagesArr.map((v,i) => {
          // console.log('message', {name: v.name, body: v.body})
          return <p key={i}>{v.name}: {v.body}</p>;
        })}
      </div>
      <form>
        <input id='chatInput' type='text'></input>
        <Button variant='text' onClick={sendMessage}>Send</Button>
      </form>
    </div>
  );
}

export default Chatbox;