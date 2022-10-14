const User = require('../models/userModel');

const usersController = {};

usersController.getUser = async (req, res, next) => {
  // find either the id from the jwt cookie OR the username from the body

  try {
    let user;
    if (res.locals.token) {
      user = await User.findById(res.locals.token._id)
        .populate('rooms')
        .populate('savedRooms');
    } else {
      const { username, password } = req.body;
      user = await User.findOne({username, password})
        .populate('rooms')
        .populate('savedRooms');
    }

    res.locals.user = user;

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

usersController.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

usersController.deleteUser = async (req, res, next) => {
  // get the id
  const id = res.locals.token._id;

  try {
    const deleteDoc = await User.findByIdAndDelete(id);

    if (!deleteDoc) {
      return res.status(400).json({ message: 'Could not delete user' });
    }

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

usersController.createUser = async (req, res, next) => {
  const { host, username, password, nickname } = req.body;

  try {
    const newUser = await User.create({
      host: host,
      username: username,
      password: password,
      nickname: nickname,
    });

    if (!newUser) {
      return res.status(400).json({ message: 'User could not be created' });
    }

    res.locals.user = newUser;

    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
};

usersController.updateUserInfo = async (req, res, next) => {
  // get the id of user
  const id = res.locals.token._id;

  const { username, password } = req.body;

  const update = {};

  if (username) {
    update.username = username;
  }

  if (password) {
    update.password = password;
  }

  try {
    const doc = await User.findByIdAndUpdate(id, update, {
      returnOriginal: false,
    });

    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
};

usersController.saveRoom = async (req, res, next) => {
  // get the id of user
  const id = res.locals.token._id;

  // get room ID to save from request body
  const { savedRooms } = req.body;

  try {
    // use $addToSet instead of $push to only retain the unique value
    await User.updateOne({ _id: id }, { $addToSet: { savedRooms: savedRooms } });

    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
};

usersController.unsaveRoom = async (req, res, next) => {
  // get the id of user
  const id = res.locals.token._id;

  // get room ID to unsave from request body
  const { savedRooms } = req.body;

  try {
    await User.updateOne({ _id: id }, { $pull: { savedRooms: savedRooms } });

    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ message: e.message });
  }
};


usersController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('rooms').populate('savedRooms');

    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.locals.users = users;

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

usersController.deleteTestUser = async (req, res, next) => {

  try {
    const deleteDoc = await User.findOneAndDelete({username:'cypress'});

    if (!deleteDoc) {
      return res.status(400).json({ message: 'Could not delete user' });
    }

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

module.exports = usersController;
