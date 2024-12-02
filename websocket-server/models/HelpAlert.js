const mongoose = require("mongoose");

const helpAlertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  helpNeeded: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, default: "pending" }, // New status field
}, { timestamps: true });

module.exports = mongoose.model("HelpAlert", helpAlertSchema);
