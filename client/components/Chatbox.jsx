import { Button } from '@mui/material';
import React, { useState } from 'react';

function Chatbox() {
  const fakeMessages = [
    {from: 'lewis', body: 'yo!'},
    {from: 'peipei', body: 'bye'}
  ];
  const [messageList, setMessages] = useState(fakeMessages);
  // need function to retrieve messages

  const messages = messageList.map((e, i) => {
    return (<p key={i}>{e.from}: {e.body}</p>);
  });

  return (
    <div className='chatbox'>
      <div id='message-container'>
        {messages}
      </div>
      <form>
        <input type='text'></input>
        <Button variant='text'>Send</Button>
      </form>
    </div>
  );
}

export default Chatbox;