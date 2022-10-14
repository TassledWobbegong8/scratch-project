const { RoomPreferencesOutlined } = require('@mui/icons-material');
const Room = require('../models/roomModel');
const User = require('../models/userModel');

const roomsController = {};

roomsController.getAllRooms = async (req, res, next) => {
  
  try {
    let roomsList;
    const { subject } = req.params;

    if (subject === 'all') {
      roomsList = await Room.find({}).where('active').equals(true).populate('host');
    }
    else {
      roomsList = await Room.find({ subject: subject }).where('active').equals(true).populate('host');
    } 

    res.locals.rooms = roomsList;

    if (roomsList.length === 0) {
      res.locals.rooms = 'There are no active rooms for this subject';
    }
    next();
  } catch (err) {
    return next({
      log: 'roomsController.getAllRooms' + err,
      message: { err: 'roomsController.getAllRooms: ERROR: could not get rooms'}
    });
  }

};

roomsController.getRoom = async (req, res, next) => {
  try {
    // gets room id from cookie
    const roomDoc = await Room.findById(res.locals.roomId);
    console.log('roomdoc', roomDoc);
    res.locals.roomDoc = roomDoc;
    return next();
  } catch (err) {
    return next(err);
  }
};

roomsController.openNewRoom = async (req, res, next) => {
  try {
    // getting current user id from token
    const { _id: host } = res.locals.token;
    // getting room info from request
    const { subject, restricted, allowedUsers, active } = req.body;
    const newRoom = await Room.create({
      host, subject, restricted,
      allowedUsers, active
    });
    // add new room to host user's rooms list
    const hostUser = await User.findById(host);
    hostUser.rooms.push(newRoom._id);
    await hostUser.save();

    res.locals.newRoom = newRoom;
    return next();
  } catch (err) {
    return next({
      log: 'roomsController.openNewRoom' + err,
      message: { err: 'roomsController.openNewRoom: ERROR: could not create room'}
    });
  }

};

// the below controller is currently not in use as of 10-11-22
roomsController.getUserRooms = async (req, res, next) => {

  try {
    const { user_id } = req.params;

    const rooms = await Room.find({ host: user_id });
    res.locals.userRooms = rooms;

    return next();
  } catch (err) {
    return next({
      log: 'roomsController.getUserRooms' + err,
      message: { err: 'roomsController.getUserRooms: ERROR: could not get user rooms'}
    });
  }

};

roomsController.deleteRoom = async (req, res, next) => {
  
  try {
    const { id: _id } = req.params;
    const roomDelete = await Room.findOneAndDelete({ _id });
    res.locals.deletedRoom = roomDelete;

    // updated host users rooms list
    await User.findOneAndUpdate({ _id: roomDelete.host },
      { $pull: { rows: _id } },
      { new: true });

    return next();

  } catch (err) {
    return next({
      log: 'roomsController.deleteRoom' + err,
      message: { err: 'roomsController.deleteRoom: ERROR: could not delete room'}
    });
  }
};


roomsController.updateRoom = async (req, res, next) => {

  try {
    // collect room information
    const { id } = req.params;
    const { subject, restricted, maxallowed, allowedUsers } = req.body;

    const updatedRoom = await Room.findByIdAndUpdate(id, { subject, restricted, maxallowed, allowedUsers });
    res.locals.updatedRoom = updatedRoom;

    return next();
  } catch (err) {
    return next({
      log: 'roomsController.updateRoom' + err,
      message: { err: 'roomsController.updateRoom: ERROR: could not update room'}
    });
  }
};

module.exports = roomsController;