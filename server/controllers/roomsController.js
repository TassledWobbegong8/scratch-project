const room = require('../models/roomModel');

const roomsController = {};

roomsController.getAllRooms = async (req, res, next) => {
    let roomslist
    try {
        roomslist = await room.find().populate('allowedUsers');
        res.locals.rooms = roomslist;

    } catch (e) {
        console.log(e.message)
    }

    if (!roomslist) {
        return res.status(404).json({ message: 'No rooms found' });
    }
    next();

}

roomsController.openNewRoom = async (req, res, next) => {
    const { subject, host, restricted, allowedUsers, pendingUsers, active } = req.body;
    let newRoom
    try {
        newRoom = await room.create({
            host: host, subject: subject, restricted: restricted, active: active,
            allowedUsers: allowedUsers, pendingUsers: pendingUsers
        });

        res.locals.newRoom = newRoom;

    } catch (e) {
        console.log(e.message)
    }

    if (!newRoom) {
        return res.status(404).json({ message: 'No new room was created' });
    }
    next();

}

module.exports = roomsController;