const mongoose = require('mongoose');
const path = require('path');
const express = require('express');
// require("mongoose-type-url");

const MONGO_URI =
  "mongodb+srv://scratch:project@scratch-project-cluster.dphri14.mongodb.net/?retryWrites=true&w=majority";

  mongoose
    .connect(MONGO_URI, {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to Mongo DB."))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());