const express = require("express");
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers, (req, res) =>
    res.status(200).json(res.locals.users)
);

router.get("/:id", usersController.getUser, (req, res) =>
  res.status(200).json(res.locals.user)
);

router.post('/', usersController.createUser, (req, res) =>
    res.status(200).json(res.locals.newUser)
);

router.delete("/:id", usersController.deleteUser, (req, res) =>
  res.status(200).json({ message: "Successfully deleted user" })
);



module.exports = router;