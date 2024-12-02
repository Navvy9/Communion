const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  eventName: { type: String, required: true },
  venue: { type: String, required: true },
  description: { type: String, required: true },
  participants: { type: Number, default: 0 },
  username: { type: String, required: true }, // Creator's username
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
