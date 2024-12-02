// const mongoose = require("mongoose");

// const DonationSchema = new mongoose.Schema({
//   projectName: { type: String, required: true },
//   description: { type: String, required: true },
//   upi: { type: String, required: true },
//   donations: [
//     {
//       donorName: { type: String, required: true },
//       amount: { type: Number, required: true },
//     },
//   ],
//   verifiedBy: { type: String, default: null },
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Link to the creator of the request
// });

// module.exports = mongoose.model("Donation", DonationSchema);
const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  raisedAmount: {
    type: Number,
    default: 0,
  },
  accountDetails: {
    type: String,
    required: true,
  },
  donors: {
    type: [String], // Store donor names
    default: [],
  },
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;


