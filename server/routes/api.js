const express = require('express');
const app = express();
const roomRouter = require('./room');
const userRouter = require('./user');
const authRouter = require('./auth');

app.use('/rooms', roomRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

module.exports = app;

