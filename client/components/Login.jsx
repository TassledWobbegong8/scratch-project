import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setLoggedIn , loggedIn}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [signup, setSignup] = useState(false);
  const [warning, setWarning] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  // setting warning msg and display to true
  const warningMsg = (input) => {
    setWarning(true);
    setMsg(input);
  };

  const logIn = async () => {
    const user = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then(response => response.json());

    setLoggedIn(user);
    if (user) navigate('/main/home');
    if (!loggedIn) warningMsg('Your Login Information is Incorrect');
  };

  const signUp = async () => {
    // post new user
    const newUser = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        nickname,
        host: false,
      })
    });

    if (newUser.status === 411) warningMsg('Password need to be at least 8 digit');
    if (newUser.status === 409) warningMsg('Please select another username.');
    if (newUser.status === 200) {
      setLoggedIn(true);
      navigate('/main/home');
    }
  };


  const loginDetails = (
    <div className="auth-container details-container">
      <h2 id="login-text">Login Details</h2>
      <TextField label="Username" onChange={(event) => setUsername(event.target.value)} />
      <TextField type='password' label="Password" onChange={(event) => setPassword(event.target.value)} />
      {warning && <p className='warning'>{msg}</p>}
      <Button onClick={logIn} variant="contained" id='auth-btn'>Login</Button>
      
      <p>{'Don\'t have an account?'} <span className='switch-auth' onClick={() => setSignup(true)}>Click here!</span></p>
    </div>);

  const signupDetails = (
    <div className="auth-container  details-container">
      <h2 id="login-text">Signup Details</h2>
      <TextField label="Username" onChange={(event) => setUsername(event.target.value)} />
      <TextField label="Nickname" onChange={(event) => setNickname(event.target.value)} />
      <TextField type='password' placeholder='Must be at least 8 characters' label="Password"  onChange={(event) => setPassword(event.target.value)} />
      {warning && <p className='warning'>{msg}</p>}
      <Button onClick={signUp} variant="contained" id='auth-btn'>Signup</Button>
      <p>{'Already have an account?'} <span className='switch-auth' onClick={() => setSignup(false)}>Click here!</span></p>
    </div>
  );

  return (
    <>
      <p className='logo' id='main-logo'>stud<span>if</span>y</p>
      <p id='slogan'><span>{'"does studying make you cry? use studify!"'}</span> - Confucius</p>
      {signup ? signupDetails : loginDetails}
    </>
    
  );
}