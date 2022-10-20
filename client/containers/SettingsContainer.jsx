import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import SettingsCard from '../components/SettingsCard';

export default function SettingsContainer() {

  const [container, setContainer] = useState('');

  const settings = [
    'LOGIN DETAILS',
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
    <div className='settings-nav'>
      <h2 style={{'textAlign': 'center'}}>Settings</h2>
      <div id='subject-links-container'>
        {settingsBtns}
      </div>
    </div>
  );
}