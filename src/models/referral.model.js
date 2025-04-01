const mongoose = require("mongoose");

// referral

const referralSchema = new mongoose.Schema({
  referrer: {
    type: String,
  },
  referrerWalletAddress: {
    type: String,
    unique: true,
  },
  referralCode: {
    type: String,
    unique: true,
  },
  referralCount: {
    type: Number,
  },
  referralCommissionsTotal: {
    type: Number,
  },
});

const Referral = new mongoose.model("Referral", referralSchema);

module.exports = Referral;
