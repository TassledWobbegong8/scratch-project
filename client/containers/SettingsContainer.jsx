import { Button } from '@mui/material';
import React, { useState } from 'react';

export default function SettingsContainer() {

  const [container, setContainer] = useState('');

  const settings = [
    'LOGIN DETAILS',
    'COMMUNICATION PREFERENCES',
    'CREDITS',
  ];

  const settingsBtns = settings.map((e, i) => {
    return (
      <Button variant='outlined'
        fullWidth={true}
        key={i}
        value={e}
        id='subject-links'
        // onClick={(event) => handleClick(event.target.value)}
      >
        {e}
      </Button>
    );
  });

  return (
    <div className='subject-nav'>
      <h2 style={{'textAlign': 'center'}}>Settings</h2>
      <div id='subject-links-container'>
        {settingsBtns}
      </div>
    </div>
  );
}