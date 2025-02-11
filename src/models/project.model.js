const mongoose = require("mongoose");

// shared

const linkSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  url: {
    type: String,
  },
});

// token

const tokenSchema = new mongoose.Schema({
  network: {
    type: String,
  },
  name: {
    type: String,
  },
  ticker: {
    type: String,
  },
  totalSupply: {
    type: Number,
  },
  contractAddress: {
    type: String,
  },
});

// header

const headerSchema = new mongoose.Schema({
  logoUrl: {
    type: String,
  },
  title: {
    type: String,
  },
});

// hero

const heroSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  links: {
    type: [linkSchema],
  },
  visualType: {
    type: String,
    enum: ["image", "video"],
    default: "image",
  },
  visualUrl: {
    type: String,
  },
  backgroundType: {
    type: String,
    enum: ["image", "video", "hex"],
    required: true,
    default: "hex",
  },
  backgroundContent: {
    type: String,
    required: true,
    default: "#FFFFFF",
  },
});

// about

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  visualType: {
    type: String,
    enum: ["image", "video"],
  },
  visualUrl: {
    type: String,
  },
  backgroundType: {
    type: String,
    enum: ["image", "video", "hex"],
  },
});

const aboutSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "About",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  visualType: {
    type: String,
    enum: ["image", "video"],
    default: "image",
  },
  visualUrl: {
    type: String,
  },
  features: {
    type: [featureSchema],
  },
  backgroundType: {
    type: String,
    enum: ["image", "video", "hex"],
    required: true,
    default: "hex",
  },
  backgroundContent: {
    type: String,
    required: true,
    default: "#FFFFFF",
  },
});

// tokenomics

const feeSchema = new mongoose.Schema({
  percentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  backgroundType: {
    type: String,
    enum: ["image", "video", "hex"],
  },
  backgroundContent: {
    type: String,
  },
});

const tokenomicsSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Tokenomics",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fees: [
    {
      type: feeSchema,
    },
  ],
  backgroundType: {
    type: String,
    enum: ["image", "video", "hex"],
    required: true,
    default: "hex",
  },
  backgroundContent: {
    type: String,
    required: true,
    default: "#FFFFFF",
  },
});

// roadmap

const milestoneSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  checked: {
    type: Boolean,
  },
});

const phaseSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  visualType: {
    type: String,
    enum: ["image", "video"],
  },
  visualUrl: {
    type: String,
  },
  milestones: [{ type: milestoneSchema }],
});

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Roadmap",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phases: [{ type: phaseSchema }],
  backgroundType: {
    type: String,
    enum: ["image", "video", "hex"],
    required: true,
    default: "hex",
  },
  backgroundContent: {
    type: String,
    required: true,
    default: "#FFFFFF",
  },
});

// footer

const footerSchema = new mongoose.Schema({
  links: [
    {
      type: linkSchema,
    },
  ],
  disclaimer: {
    type: String,
  },
});

const projectSchema = new mongoose.Schema({
  token: {
    type: tokenSchema,
  },
  header: {
    type: headerSchema,
  },
  hero: {
    type: heroSchema,
  },
  about: {
    type: aboutSchema,
  },
  tokenomics: {
    type: tokenomicsSchema,
  },
  roadmap: {
    type: roadmapSchema,
  },
  footer: {
    type: footerSchema,
  },
  url: {
    type: String,
    required: true,
  },
});

const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;
