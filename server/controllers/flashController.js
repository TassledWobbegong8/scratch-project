const mongoose = require('mongoose');
const Flash = require('../models/flashModel');

const flashController = {};

flashController.getFlashCard = async (req, res, next) => {
  const { subject } = req.body; 
  try {
    const card = await Flash.find({subject});
    res.locals.questions = card; 
    return next();
  }
  catch (err) {
    return next(err);
  }
};

module.exports = flashController;