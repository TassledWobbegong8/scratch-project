import React from 'react';
import io from 'socket.io-client';
import Dashboard from '../containers/Dashboard';
const SERVER = 'http://127.0.0.1:3000';

import '../stylesheets/main.scss';

const socket = io.connect(SERVER);
function App() {

  return <Dashboard/>;
}

export default App;