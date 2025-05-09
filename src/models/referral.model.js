const mongoose = require("mongoose");

// referral

const referralSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    unique: true,
    required: true,
  },
  code: {
    type: String,
    unique: true,
    required: true,
  },
  commissionPercentage: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  commissionsEarned: {
    type: Number,
    default: 0,
  },
});

const Referral = new mongoose.model("Referral", referralSchema);

module.exports = Referral;
