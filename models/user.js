const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const Home = require("./home");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    default: false
  },
  password: {
    type: String,
    default: false
  },
  homes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Home"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
