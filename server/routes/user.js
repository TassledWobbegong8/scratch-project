const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');

router.get('/', usersController.getAllUsers, (req, res) =>
  res.status(200).json(res.locals.users)
);

router.get('/user', cookieController.verifyUser, usersController.getUser, (req, res) =>
  res.status(200).json(res.locals.user)
);

router.post('/', usersController.createUser, cookieController.setUserCookie, (req, res) =>
  res.status(200).json(res.locals.user)
);

router.delete('/:id', usersController.deleteUser, (req, res) =>
  res.status(200).json({ message: 'Successfully deleted user' })
);

router.patch('/:id', usersController.updateUserInfo, (req, res) =>
  res.status(200).json({ message: 'User update successful' })
);

router.patch('/:id/saveroom/', usersController.saveRoom, (req, res) =>
  res.status(200).json({ message: 'Room successfully saved'})
);

router.patch('/:id/unsaveroom/', usersController.unsaveRoom, (req, res) =>
  res.status(200).json({ message: 'Room successfully unsaved' })
);

module.exports = router;