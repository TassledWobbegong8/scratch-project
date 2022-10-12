const { findById, findByIdAndUpdate } = require('../models/roomModel');
const room = require('../models/roomModel');
const user = require('../models/userModel');

const roomsController = {};

roomsController.getAllRooms = async (req, res, next) => {
  let roomslist;
  const { subject } = req.params;
  try {

    roomslist = await room.find({ subject: subject }).where('active').equals(true).populate('host');
    console.log(roomslist);
    res.locals.roomslist = roomslist;

  } catch (e) {
    console.log(e.message);
  }

  if (roomslist.length === 0) {
    res.locals.roomslist = 'There are no active rooms for this subject';
  }
  next();

};

roomsController.getRoom = async (req, res, next) => {
  try {
    console.log('getRoom id', res.locals.roomId);
    const roomDoc = await room.findById(res.locals.roomId);
    console.log('roomdoc', roomDoc);
    res.locals.roomDoc = roomDoc;
    return next();
  } catch (err) {
    return next(err);
  }
};

roomsController.openNewRoom = async (req, res, next) => {
  const { _id: host } = res.locals.token;
  const { subject, restricted, allowedUsers, active } = req.body;
  let newRoom;
  try {
    newRoom = await room.create({
      host, subject, restricted,
      allowedUsers, active
    });
    // add new room to host user's rooms list
    const hostUser = await user.findById(host);
    hostUser.rooms.push(newRoom._id);
    await hostUser.save();

    res.locals.newRoom = newRoom;
    console.log(newRoom);
  } catch (e) {
    console.log(e.message);
  }

  if (!newRoom) {
    return res.status(404).json({ message: 'No new room was created' });
  }
  next();

};

roomsController.getUserRooms = async (req, res, next) => {
  const { user_id } = req.params;
  let rooms;
  try {
    rooms = await room.find({ host: user_id });
    res.locals.userRooms = rooms;
  } catch (e) {
    console.log(e.message);
  }

  if (rooms.length === 0) {
    return res.status(404).json({ message: 'There are no rooms associated to this user ID' });
  }

  next();

};

roomsController.deleteRoom = async (req, res, next) => {
  const { id } = req.params;

  let roomDelete;
  try {

    roomDelete = await room.findOneAndDelete({ _id: id });
    res.locals.deletedRoom = roomDelete;
    // updated host users rooms list

    const removedFromUser = await user.findOneAndUpdate({ _id: roomDelete.host },
      { $pull: { rows: id } },
      { new: true });

  } catch (e) {
    console.log(e.message);
  }

  if (!roomDelete) {
    return res.status(404).json({ message: 'Unable to find the room to delete' });
  }
  next();
};


roomsController.updateRoom = async (req, res, next) => {
  const { id } = req.params;
  const { subject, restricted, maxallowed, allowedUsers } = req.body;
  let updatedRoom;
  try {

    updatedRoom = await room.findByIdAndUpdate(id, { subject, restricted, maxallowed, allowedUsers });
    res.locals.updatedRoom = updatedRoom;
  } catch (e) {
    console.log(e.message);
  }

  if (!updatedRoom) {
    return res.status(404).json({ message: 'Unable to find the room' });
  }

  next();
};

module.exports = roomsController;