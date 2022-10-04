const express = require("express");
const router = express.Router();

const roomsController = require('../controllers/roomsController')
router.get('/:subject',
    roomsController.getAllRooms,
    (req, res) => res.status(200).json(res.locals.activeRooms)
);

router.post('/',
    roomsController.openNewRoom,
    (req, res) => res.status(200).json(res.locals.newRoom)
);

router.delete('/:id',
    roomsController.deleteRoom,
    (req, res) => res.status(200).json(res.locals.deletedRoom)
);

router.get('/:id',
    roomsController.getUserRooms,
    (req, res) => res.status(200).json(res.locals.userRooms)
);


module.exports = router;