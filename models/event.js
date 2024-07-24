const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const User = require('./user');
// const Home = require('./home');

const EventSchema = new Schema({
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  homeId: {
    type: mongoose.Types.ObjectId,
    ref: "Home",
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Event", EventSchema);
