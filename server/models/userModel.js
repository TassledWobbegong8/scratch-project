const mongoose = require('mongoose');
const Room = require('./roomModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  host: { type: Boolean, required: true },
  username: { type: String, required: true, unique: true },
  nickname: { type: String },
  password: { type: String, required: true, minlength: 8 },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  savedRooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
});

userSchema.pre('save', function (next) {

  if (!this.nickname) {
    this.nickname = this.get('username'); 
  }
  next();
});

userSchema.post('findOneAndDelete', async (doc, next) => {
  // grab the id of the user doc being deleted
  const id = doc._id;

  // delete assocated room
  // find all rooms with user id in the host field and delete
  await Room.deleteMany({ host: id });

  // find all rooms with user id in allowed or pending users arrays and remove the user id reference (pull id from each array if it exists)
  await Room.updateMany(
    // filter
    { $or: [{ allowedUsers: id }, { pendingUsers: id }] },
    // update object
    { $pull: { allowedUsers: id, pendingUsers: id } }
  );

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;