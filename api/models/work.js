const mongoose = require("mongoose");

const workSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, required: true },
  photos: { type: Object, required: true },
});

module.exports = mongoose.model("Work", workSchema);
