const express = require("express");
const router = express.Router();

const roomsController = require('../controllers/roomsController')
router.get('/:subject',
    roomsController.getAllRooms,
    (req, res) => res.status(200).json(res.locals.roomslist)
);

router.post('/',
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

router.patch('/update/:id',
    roomsController.updateRoom,
    (req, res) => res.status(200).json({ message: 'Updated the Room info.' })
);


module.exports = router;