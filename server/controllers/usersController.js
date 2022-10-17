const bcrypt = require('bcrypt');

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
      console.log('password', password);

      const passwordHash = await User.findOne({username});

      if(passwordHash !== null){
        const passwordCorrect = await bcrypt.compare(
          password,
          passwordHash.password
        );
        if(passwordCorrect){
          user = await User.findOne({username})
            .populate('rooms')
            .populate('savedRooms');
        } 
      }
    

      // user = await User.findOne({username, password})
      //   .populate('rooms')
      //   .populate('savedRooms');
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

  const { username, password, nickname } = req.body;


  // create a bcrypt hash
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password.toString(), salt);
  console.log('passwordHash from userController.createUser', passwordHash);
  try {
    const newUser = await User.create({
      username: username,
      password: passwordHash,
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

  // create a bcrypt hash
  const salt = await bcrypt.genSalt();

  const { username, password } = req.body;

  const update = {};

  if (username) {
    update.username = username;
  }

  if (password) {
    const passwordHash = await bcrypt.hash(password.toString(), salt);
    update.password = passwordHash;
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
  try {
    // get the id of user
    const { _id}  = res.locals.token;
    // get room ID to save from request body
    const { savedRoom } = req.body;

    // retrieve user and check if room is already in array
    const { savedRooms } = await User.findById(_id);
    // console.log(savedRoom, savedRooms)
    if (savedRooms.includes(savedRoom)) {
      res.locals.saved = false;
      // console.log('already saved!')
    } else {
      await User.updateOne({ _id }, { $push: { savedRooms: savedRoom } });
      res.locals.saved = true;
      // console.log('saved room!')
    }
    return next();
  } catch (err) {
    return next(err);
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


// retrieve uploaded file key and save in user document
usersController.saveFile = async (req, res, next) => {
  try {
    // console.log('SAVEFILE REQ', req);
    const { fileName, user } = res.locals;
    
    // push into user file array
    user.files.push(fileName);
    // save new user doc
    await user.save();
    res.locals.fileArray = user.files;
    console.log('Checking User',user);
    return next();
  } catch(err) {
    return next({
      log: 'usersController.saveFile' + err,
      message: { err: 'usersController.saveFile: ERROR: could not save file to user'}
    });
  }
};

module.exports = usersController;
