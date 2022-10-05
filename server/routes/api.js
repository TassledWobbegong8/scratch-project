const express = require('express');
const app = express();
const roomRouter = require('./room');
const userRouter = require('./user');
const cookieController = require('../controllers/cookieController');

app.use('/rooms', roomRouter);
app.use('/users', userRouter);

app.get('/verify', cookieController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.token);
});

app.get('/logout', cookieController.deleteSession, (req, res) => {
  res.status(200).json(res.locals.cookie);
});

module.exports = app;

