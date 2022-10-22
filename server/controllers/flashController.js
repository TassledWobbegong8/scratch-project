const mongoose = require('mongoose');
const Flash = require('../models/flashModel');

const flashController = {};

flashController.getFlashCard = async (req, res, next) => {
  //const { subject } = req.body; 
  try {
    const card = await Flash.find();
    console.log(card);
    res.locals.questions = card; 
    return next();
  }
  catch (err) {
    return next(err);
  }
};

flashController.createFlashCard = async (req, res, next) => {
  try {
    const subject = req.body.subject;
    const questions = req.body.questions;
    const update = await Flash.findOneAndUpdate({subject},{questions});
    res.locals.update = update;
 
    //console.log(update);
    return next();
    
  }
  catch (err) {
    return next(
      console.log('error happened @ flashController.createFlashCard')
    );
  }
};

module.exports = flashController;