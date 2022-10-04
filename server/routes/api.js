const express = require('express');
const app = express();
const roomRouter = require('./room');
const userRouter = require('./user');

app.use("/rooms", roomRouter);
app.use("/users", userRouter);

module.exports = app;

