const mongoose = require("mongoose");

const heroLinkSchema = new mongooseSchema({
  text: {
    type: String,
  },
  url: {
    type: String,
  },
});

const projectSchema = new mongoose.Schema({
  tokenNetwork: {
    type: String,
  },
  tokenName: {
    type: String,
  },
  tokenTicker: {
    type: String,
  },
  tokenTotalSupply: {
    type: Number,
  },
  tokenContractAddress: {
    type: String,
  },
  headerLogoUrl: {
    type: String,
  },
  headerTitle: {
    type: String,
  },
  heroHeadline: {
    type: String,
  },
  heroShortDescription: {
    type: String,
  },
  heroLinks: {
    type: [heroLinkSchema],
  },
  heroVisualType: {
    type: String,
    enum: ["image", "video"],
  },
  heroVisualUrl: {
    type: String,
  },
  heroBackgroundType: {
    type: String,
    enum: ["image", "video", "hex"],
  },
  
});
