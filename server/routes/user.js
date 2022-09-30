const express = require("express");
const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers, (req, res) =>
    res.status(200).json(res.locals.users)
);

router.post('/', usersController.createUser, (req, res) =>
    res.status(200).json(res.locals.newUser)
);



module.exports = router;