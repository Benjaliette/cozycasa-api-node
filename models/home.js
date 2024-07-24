const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const User = require("./user");

const HomeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true })

module.exports = mongoose.model("Home", HomeSchema);
