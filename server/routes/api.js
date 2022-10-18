const express = require('express');
const app = express();
const roomRouter = require('./room');
const userRouter = require('./user');
const authRouter = require('./auth');
const flashRouter = require('./flash');

app.use('/home', flashRouter);
app.use('/rooms', roomRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);



module.exports = app;

