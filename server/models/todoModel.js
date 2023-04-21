const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  userName: {
    type: String,
  },
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
