const mongoose = require('mongoose');
const path = require('path');
const express = require('express');

const apiRouter = require("./routes/api");

/////////////////////
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;
const CONFIG = require('./config');
const cookieParser = require('cookie-parser');
///////////////////////


// require("mongoose-type-url");

const PORT = 3000;

const MONGO_URI =
  "mongodb+srv://scratch:project@scratch-project-cluster.dphri14.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Mongo DB."))
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

  const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0])
  if (req.query.error) { console.log(req.query.error) }
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
    scope: CONFIG.oauth2Credentials.scopes // Using the access scopes from our config file
  });
  console.log(loginLink)
  return res.status(200).json(loginLink)
})


app.use("/api", apiRouter);

app.use((req, res) =>
  res.status(404).send("Page not found")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
}); //listens on port 3000 -> http://localhost:3000/