const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const flashShema = new Schema({
  subject: { type: String, required: true },
  questions:{type: Array, required: true},
});

const Flash = mongoose.model('Flash', flashShema);

module.exports = Flash;