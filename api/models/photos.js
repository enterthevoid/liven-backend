const mongoose = require("mongoose");

const photosSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  workId: { type: mongoose.Schema.Types.ObjectId, ref: "Work" },
  imgs: { type: Object, required: true },
  totalItemsCount: { type: Number, required: true },
});

module.exports = mongoose.model("Photos", workSchema);
