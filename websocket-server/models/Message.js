// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  group: String,
  username: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
