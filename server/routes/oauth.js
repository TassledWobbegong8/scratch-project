const express = require('express');
const router = express.Router();

///////////////
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;
const CONFIG = require('../config');

const oauth2Client = new OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);

///////////////

router.get('/', (req, res) => {

  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: CONFIG.oauth2Credentials.scopes,
    include_granted_scopes: true
  });
  // console.log(loginLink);
  return res.status(200).json(loginLink);
});

router.get('/auth_callback', async (req, res, next) => {
  try {

    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);

    const jwt_token = jwt.sign(tokens.refresh_token, CONFIG.JWTsecret);
    // store on cookie
    res.cookie('O_AUTH', jwt_token, {httpOnly: true});

    return res.redirect('http://localhost:8080/main/room');

    // return res.redirect('/access_drive');

  } catch (e) {
    console.log(e.message);
    return (next);
  }
});


router.get('/access_drive', async (req, res, next) => {
  console.log('access drive');
  const jwt_token = req.cookies.O_AUTH;
  // if no jwt found, return false to frontend
  if (!jwt_token) {
    console.log('no token');
    return res.status(200).json(false);
  }
  const decoded = jwt.verify(jwt_token, CONFIG.JWTsecret);
  
  const drive = google.drive('v3');
  let response;
  const fileArray = [];
  try {
    response = await drive.files.list({
      auth: oauth2Client,
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)'
    });
    if (response.data.files.length) {
      response.data.files.forEach(e => { fileArray.push({id: e.id, name: e.name}); });
    } else { return res.status(400).json('There were no documents found on this drive'); }
    return res.status(200).json(fileArray);

  } catch (e) {
    console.log('Error from API:', e.message);
  }

});

router.get('/get_doc', async (req, res) => {

  const documentId = req.query.documentId;

  const docs = google.docs({ version: 'v1', auth: oauth2Client });

  const docData = await docs.documents.get({
    documentId: documentId
  });

  res.status(200).json(docData.data);

});

module.exports = router;