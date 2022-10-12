const express = require('express');
const router = express.Router();

const cookieController = require('../controllers/cookieController');
const usersController = require('../controllers/usersController');

// use route -> localhost:3000/api/auth/*

router.get('/verify', cookieController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.token);
});

router.get('/logout', cookieController.deleteSession, (req, res) => {
  res.status(200).json(res.locals.cookie);
});

router.post('/login', usersController.getUser, cookieController.setUserCookie, (req, res) => {
  res.status(200).json(res.locals.loggedIn);
});
// router.post('/login', (req, res) => {
//   console.log(req.body);
//   res.status(200).send('test')
// })

module.exports = router;