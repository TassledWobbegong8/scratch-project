const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  subject: { type: String, required: true },
  active: { type: Boolean },
  host: { type: Schema.Types.ObjectId, ref: 'User' },
  // updating allowed type from ID to username for readability
  allowedUsers: [{ type: String, ref: 'User' }],
  pendingUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  maxallowed: { type: Number, max: 6 },
  restricted: { type: Boolean, required: true },
  documentId: { type: String },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
