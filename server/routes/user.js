const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const cookieController = require('../controllers/cookieController');

// router.get('/', usersController.getAllUsers, (req, res) =>
//   res.status(200).json(res.locals.users)
// );

router.get('/:id', usersController.getUserById, (req, res) => 
  res.status(200).json(res.locals.user)
);

router.get('/', cookieController.verifyUser, usersController.getUser, (req, res) =>
  res.status(200).json(res.locals.user)
);

router.post('/', usersController.createUser, cookieController.setUserCookie, (req, res) =>
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
  (req, res) => res.status(200).json(res.locals.saved)
);

router.patch(
  '/unsaveroom',
  cookieController.verifyUser,
  usersController.unsaveRoom,
  (req, res) => res.status(200).json({ message: 'Room successfully unsaved' })
);

module.exports = router;