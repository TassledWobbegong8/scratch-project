import React, { useState, useEffect } from "react";
import { Button } from '@mui/material';

function Chatbox() {
  return (
    <div className='chatbox'>
      <div id='message-container'>
        some messages here
      </div>
      <form>
        <input type='text'></input>
        <Button variant='contained'>Send</Button>
      </form>
    </div>
  )
}

export default Chatbox;