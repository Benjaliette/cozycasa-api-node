const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = require('./user');

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
    ref: User,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
