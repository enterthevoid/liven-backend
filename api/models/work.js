const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  description: String,
  photos: Object,
});

module.exports = mongoose.model("Work", workSchema);
