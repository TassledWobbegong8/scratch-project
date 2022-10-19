const express = require('express');
const router = express.Router();
const flashController = require('../controllers/flashController');


router.post('/', flashController.getFlashCard, (req, res) => {
  res.status(200).json(res.locals.questions);
});

module.exports = router; 
