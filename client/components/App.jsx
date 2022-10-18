import React from 'react';
import Dashboard from '../containers/Dashboard';
import io from 'socket.io-client'
const SERVER = "http://127.0.0.1:3000"

import '../stylesheets/main.scss';

const socket = io.connect(SERVER)
function App() {

  return <Dashboard/>;
}

export default App;