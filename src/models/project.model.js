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
  titleColor: {
    type: String,
    default: "#000000",
  },
  linkColorDesktop: {
    type: String,
    default: "#000000",
  },
  linkColorMobile: {
    type: String,
    default: "#FFFFFF",
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
    default: "#000000",
  },
});

// hero

const heroSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  headlineColor: {
    type: String,
    default: "#000000",
  },
  shortDescription: {
    type: String,
    required: true,
  },
  shortDescriptionColor: {
    type: String,
    defualt: "#000000",
  },
  links: {
    type: [linkSchema],
  },
  linkColor: {
    type: String,
    default: "#FFFFFF",
  },
  linkBackgroundColor: {
    type: String,
    default: "#000000",
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
  titleColor: {
    type: String,
    default: "#000000",
  },
  description: {
    type: String,
  },
  descriptionColor: {
    type: "#000000",
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
  titleColor: {
    type: String,
    default: "#000000",
  },
  description: {
    type: String,
    required: true,
  },
  descriptionColor: {
    type: String,
    default: "#000000",
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
  percentageColor: {
    type: String,
    default: "#000000",
  },
  title: {
    type: String,
  },
  titleColor: {
    type: String,
    default: "#000000",
  },
  description: {
    type: String,
  },
  descriptionColor: {
    type: String,
    default: "#000000",
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
  titleColor: {
    type: String,
    default: "#000000",
  },
  description: {
    type: String,
    required: true,
  },
  descriptionColor: {
    type: String,
    default: "#000000",
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
  titleColor: {
    type: String,
    default: "#000000",
  },
  visualType: {
    type: String,
    enum: ["image", "video"],
  },
  visualUrl: {
    type: String,
  },
  milestones: [{ type: milestoneSchema }],
  milestoneColor: {
    type: String,
    default: "#000000",
  },
});

const roadmapSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Roadmap",
    required: true,
  },
  titleColor: {
    type: String,
    default: "#000000",
  },
  description: {
    type: String,
    required: true,
  },
  descriptionColor: {
    type: String,
    default: "#000000",
  },
  phases: [{ type: phaseSchema }],
  phaseColor: {
    type: String,
    default: "#000000",
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

// footer

const footerSchema = new mongoose.Schema({
  links: [
    {
      type: linkSchema,
    },
  ],
  linkColor: {
    type: String,
    default: "#000000",
  },
  disclaimer: {
    type: String,
  },
  disclaimerColor: {
    type: String,
    default: "#000000",
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
