const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
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
}, { timestamps: true });

module.exports = mongoose.model("Todo", TodoSchema);
