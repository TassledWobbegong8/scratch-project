const express = require('express');
const router = express.Router();

const roomsController = require('../controllers/roomsController');
const cookieController = require('../controllers/cookieController');

// use route -> localhost:3000/api/rooms/*

// router.get('/',
//   cookieController.getRoomCookie,
//   roomsController.getRoom,
//   (req, res) => res.status(200).json(res.locals.room)
// );
router.get('/allRooms',
  roomsController.getAllRooms,
  (req, res) => res.status(200).json(res.locals.roomslist)
);

router.post('/',
  cookieController.verifyUser,
  roomsController.openNewRoom,
  (req, res) => res.status(200).json(res.locals.newRoom)
);

router.delete('/:id',
  roomsController.deleteRoom,
  (req, res) => res.status(200).json(res.locals.deletedRoom)
);

router.get('/user/:id',
  roomsController.getUserRooms,
  (req, res) => res.status(200).json(res.locals.userRooms)
);

router.patch('/newUser/:id',
  roomsController.addUser,
  (req, res) => res.status(200).json({ message: 'Updated the Room info.' })
);

router.patch('/update/:id',
  roomsController.updateRoom,
  (req, res) => res.status(200).json({ message: 'Updated the Room info.' })
);

router.get('/cookie',
  cookieController.getRoomCookie,
  roomsController.getRoom,
  (req, res) => res.status(200).json(res.locals.roomDoc)
);

router.post('/cookie',
  cookieController.setRoomCookie,
  (req, res) => res.status(200).json('set room cookie!')
);

router.get('/:subject',
  roomsController.getRoomsSubject,
  (req, res) => res.status(200).json(res.locals.roomslist)
);

module.exports = router;