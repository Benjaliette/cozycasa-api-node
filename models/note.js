const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const User = require("./user");
// const Home = require("./home");

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    default: " "
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

module.exports = mongoose.model("Note", NoteSchema);
