const User = require("../models/userModel");

const usersController = {};

usersController.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().populate('rooms');

        if (!users) {
            return res.status(404).json({ message: 'No users found' })

        }

        res.locals.users = users;

        return next();
    } catch (e) {
        console.log(e);
        return next(e);
    }
};

usersController.getUser = async (req, res, next) => {

    const { id } = req.params;

  try {
    const user = await User.findById(id).populate("rooms");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    res.locals.user = user;

    return next();
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

usersController.deleteUser = async (req, res, next) => {

  const { id } = req.params;

  try {

    const deleteDoc = await User.findByIdAndDelete(id);

    if (!deleteDoc) {
      return res.status(400).json({ message: "Could not delete user" });
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
        const newUser = await User.create({ host: host, username: username, password: password, nickname: nickname });

        if (!newUser) {
            return res.status(400).json({ message: "User could not be created" });
        }

        res.locals.newUser = newUser;

        return next();
    } catch (e) {
        return res.status(400).json({ message: e.message });
        
    }
};

module.exports = usersController;