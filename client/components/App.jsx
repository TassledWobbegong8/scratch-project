import React, { useState } from 'react';
import Dashboard from '../containers/Dashboard';
import { Link, redirect, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import '../stylesheets/main.scss';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8ad297',
      main: '#5aa069',
      dark: '#2a713e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#dbffff',
      main: '#a7ffeb',
      dark: '#75ccb9',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function App() {
  return (<ThemeProvider theme={theme}>
    <Dashboard/>
  </ThemeProvider>);
}

export default App;