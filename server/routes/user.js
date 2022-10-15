const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');

// use route -> localhost:3000/api/users/*

router.get('/getAllUser', usersController.getAllUsers, (req, res) =>
  res.status(200).json(res.locals.users)
);

router.get('/:id', usersController.getUserById, (req, res) => 
  res.status(200).json(res.locals.user)
);

router.get('/', cookieController.verifyUser, usersController.getUser, (req, res) =>
  res.status(200).json(res.locals.user)
);

// Controller for signup
router.post('/', usersController.validateUser, usersController.createUser, cookieController.setUserCookie, (req, res) =>
  res.status(200).json(res.locals.user)
);

router.delete(
  '/',
  cookieController.verifyUser,
  usersController.deleteUser,
  (req, res) => res.status(200).json({ message: 'Successfully deleted user' })
);

router.patch(
  '/',
  cookieController.verifyUser,
  usersController.updateUserInfo,
  (req, res) => res.status(200).json({ message: 'User update successful' })
);

router.patch(
  '/saveroom',
  cookieController.verifyUser,
  usersController.saveRoom,
  (req, res) => res.status(200).json({ message: 'Room successfully saved' })
);

router.patch(
  '/unsaveroom',
  cookieController.verifyUser,
  usersController.unsaveRoom,
  (req, res) => res.status(200).json({ message: 'Room successfully unsaved' })
);

// router for cypress testing purpose, only delete one specific test user.
router.delete('/test', 
  usersController.deleteTestUser,
  (req, res) => {
    res.status(200).json({message: 'Successfully deleted test user'});
  });

module.exports = router;