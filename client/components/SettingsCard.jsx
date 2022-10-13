import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function SettingsCard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [realname, setRealname] = useState({'firstname': '', 'lastname': ''});
  const [address, setAddress] = useState(
    {
      shippingAddress: '',
      apartment: '',
      city: '',
      zipCode: '',
      phone: '',
    }
  );

  const loginDetails = (
    <div className='details-container' id="settings-container">
      <h2 id="login-text">Login Details</h2>
      <TextField label="Email Address"/>
      <TextField label="Password"/>
      <TextField label="Confirm Password"/>
      <Button variant="contained" style={{maxWidth: '240px', maxHeight: '50px', minWidth: '240px', minHeight: '50px', margin: '0 auto', position: 'relative'}}>Submit </Button>
    </div>);


  return loginDetails;
}