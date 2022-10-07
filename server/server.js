const mongoose = require('mongoose');
const path = require('path');
const express = require('express');

const apiRouter = require('./routes/api');

/////////////////////
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;
const CONFIG = require('./config');
const cookieParser = require('cookie-parser');
const { JWTsecret, oauth2Credentials } = require('./config');
const { drive } = require('googleapis/build/src/apis/drive');
///////////////////////


// require("mongoose-type-url");

const PORT = 3000;

const MONGO_URI =
  'mongodb+srv://scratch:project@scratch-project-cluster.dphri14.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///////////////////////
app.use(cookieParser());
//////////////////////


// placeholder route for production 
// app.use('/build', express.static(path.join(__dirname, '../build')));

// placeholder route for serving app 
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/auth', (req, res) => {

  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  if (req.query.error) { console.log(req.query.error); }
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: CONFIG.oauth2Credentials.scopes
  });
  console.log(loginLink);
  return res.status(200).json(loginLink);
});

app.get('/auth_callback', (req, res) => {
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  if (req.query.error) {
    console.log(req.query.error);
    return res.redirect('/');
  } else {
    const token = oauth2Client.getToken(req.query.code);
    res.cookie('gjwt', jwt.sign(token, JWTsecret));
    return res.redirect('/access_drive');

  }
});

app.get('/access_drive', (req, res) => {
  if (!res.cookies.gjwt) return res.redirect('/');
  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
  oauth2Client.credentials = jwt.verify(res.cookies.gjwt, JWTsecret);
  const service = google.drive('v3');
  drive.files.list({}, (err, res) => {
    if (err) throw err;
    const files = res.data.files;
    if (files.length) {
      files.map(e => console.log(e));
    } else { console.log('No Files Found'); }
  });

});


app.use('/api', apiRouter);

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

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
}); //listens on port 3000 -> http://localhost:3000/