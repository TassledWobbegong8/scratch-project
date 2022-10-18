const express = require('express');
const router = express.Router();
const flashController = require('../controllers/flashController');


router.get('/', flashController.getFlashCard, (req, res) => {
  res.status(200).json(res.locals.cards);
});

module.exports = router; 
