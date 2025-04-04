const mongoose = require("mongoose");

// referral

const referralSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
  },
  commissionPercentage: {
    type: Number,
  },
  count: {
    type: Number,
  },
  commissionsEarned: {
    type: Number,
  },
});

const Referral = new mongoose.model("Referral", referralSchema);

module.exports = Referral;
