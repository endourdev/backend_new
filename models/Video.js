const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoTitle: { type: String, required: true },
  videoDescription: { type: String, required: true },
  videoAuthor: { type: String, required: true },
  dateOfPublish: { type: String, required: true },
});

module.exports = mongoose.model("Video", videoSchema);