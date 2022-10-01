const express = require("express");
const router = express.Router();

const roomsController = require('../controllers/roomsController')
router.get('/',
    roomsController.getAllRooms,
    (req, res) => res.status(200).json(res.locals.rooms)
);

router.post('/',
    roomsController.openNewRoom,
    (req, res) => res.status(200).json(res.locals.newRoom)
);


module.exports = router;