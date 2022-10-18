const mongoose = require('mongoose');
const Flash = require('../models/flashModel');

const flashController = {};

flashController.getFlashCard = async (req, res, next) => {
  // const sub = req.body.subject; 
  // console.log(sub);
  try {
    const card = await Flash.find();
    res.locals.cards = card; 
    console.log(card);
    return next();
  }
  catch (err) {
    return next(err);
  }
};

module.exports = flashController;