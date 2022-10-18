const express = require('express');
const router = express.Router();
const flashController = require('../controllers/flashController');

const data = [
  {
    subject: 'javascript',
    questions: [
      ['what\'re the primitive data types?', 'number, bigInt,NaN, etc'],
      ['what does OOP stand for?', 'object-oriented programming'],
    ],
  },
  {
    subject: 'math',
    questions: [
      [' 1 + 1 = ?', '2'],
      ['2 + 2 = ?', '4'],
    ],
  },
  {
    subject: 'harry potter',
    questions: [],
  },
];

router.get('/', flashController.getFlashCard, (req, res) => {
  res.status(200).json(data);
});

module.exports = router; 
