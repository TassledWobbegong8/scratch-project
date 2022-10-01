const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  host: { type: Boolean, required: true },
  username: { type: String, required: true, unique: true },
  nickname: { type: String },
  password: { type: String, required: true, minlength: 8 },
  rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
});

userSchema.pre("save", function (next) {

  if (!this.nickname) {
    this.nickname = this.get("username"); 
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;