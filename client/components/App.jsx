import React, { useState } from 'react';
import Dashboard from '../containers/Dashboard';
import Login from './Login';
import { Link, redirect, Route, Routes } from 'react-router-dom';

import '../stylesheets/main.scss';

function App() {
    return <Dashboard/>
}

export default App;