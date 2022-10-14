const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
require('dotenv').config();

/////////////////////
const cookieParser = require('cookie-parser');
const apiRouter = require('./routes/api');
const oAuthRouter = require('./routes/oauth');
///////////////////////

const PORT = 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));


const app = express();

///////////////////////
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//////////////////////


// placeholder route for serving app
app.use('/', express.static(path.resolve(__dirname, '../build')));

///////////////////
app.use('/api', apiRouter);
app.use('/oauth', oAuthRouter);
///////////////////


app.use((req, res) =>
  res.status(404).send('Page not found')
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
}); //listens on port 3000 -> http://localhost:3000/