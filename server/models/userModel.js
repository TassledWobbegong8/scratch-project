const mongoose = require("mongoose");
// require("mongoose-type-url");

// const MONGO_URI =
//   "mongodb+srv://scratch:project@scratch-project-cluster.dphri14.mongodb.net/?retryWrites=true&w=majority";

//   mongoose
//     .connect(MONGO_URI, {
//       // options for the connect method to parse the URI
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("Connected to Mongo DB."))
//     .catch((err) => console.log(err));

  const Schema = mongoose.Schema;

  const userSchema = new Schema({
    host: { type: Boolean, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
  });

  const User = mongoose.model("users", userSchema);

  module.exports = User;