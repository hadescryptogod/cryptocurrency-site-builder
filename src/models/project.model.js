const mongoose = require("mongoose");

const projectSample = {
  name: "Project Name",
  slug: "project-name",
  token: {
    network: "Ethereum Chain",
    name: "ABC Coin",
    ticker: "ABC",
    totalSupply: 1000000000,
    contractAddress: "0x1234567890abcdefghijklmnopqrstuvwxyz",
  },
  header: {
    logoUrl: "assets/image-1.png",
    title: "$ABC",
    titleColor: "#000000",
    linkColorDesktop: "#000000",
    linkColorMobile: "#FFFFFF",
    backgroundType: "color",
    backgroundContent: "#000000",
  },
  hero: {
    headline: "Lorem Ipsum",
    headlineColor: "#000000",
    shortDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    shortDescriptionColor: "#000000",
    links: [
      {
        text: "Buy on Uniswap",
        url: "https://app.uniswap.org/",
      },
      {
        text: "Join our Telegram",
        url: "https://t.me/abccoin/",
      },
    ],
    linkColor: "#FFFFFF",
    linkBackgroundColor: "#000000",
    visualType: "image",
    visualUrl: "assets/image-2.png",
    backgroundType: "color",
    backgroundContent: "#FFFFFF",
  },
  about: {
    title: "About",
    titleColor: "#000000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    descriptionColor: "#000000",
    visualType: "image",
    visualUrl: "assets/image-3.png",
    longDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    longDescriptionColor: "#000000",
    features: [
      {
        title: "Feature 1 Title",
        description: "Feature 1 Description",
        visualType: "image",
        visualUrl: "assets/feature-1.png",
        backgroundType: "color",
        backgroundContent: "#FFFFFF",
      },
      {
        title: "Feature 2 Title",
        description: "Feature 2 Description",
        visualType: "image",
        visualUrl: "assets/feature-2.png",
        backgroundType: "color",
        backgroundContent: "#FFFFFF",
      },
      {
        title: "Feature 3 Title",
        description: "Feature 3 Description",
        visualType: "image",
        visualUrl: "assets/feature-3.png",
        backgroundType: "color",
        backgroundContent: "#FFFFFF",
      },
      {
        title: "Feature 4 Title",
        description: "Feature 4 Description",
        visualType: "image",
        visualUrl: "assets/feature-4.png",
        backgroundType: "color",
        backgroundContent: "#FFFFFF",
      },
    ],
    featuresTitleColor: "#000000",
    featuresDescriptionColor: "#000000",
    backgroundType: "color",
    backgroundContent: "#FFFFFF",
  },
  tokenomics: {
    title: "Tokenomics",
    titleColor: "#000000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    descriptionColor: "#000000",
    fees: [
      {
        percentage: 6,
        title: "Marketing",
        description:
          "6% of every transaction is taken and will be used for enhancements, operations, and marketing of the project.",
        backgroundType: "color",
        backgroundContent: "#FFFFFF",
      },
      {
        percentage: 6,
        title: "Liquidity",
        description:
          "1% of every transaction is transformed into liquidity. It's automatic and helps create a price floor.",
        backgroundType: "color",
        backgroundContent: "#FFFFFF",
      },
    ],
    feesPercentageColor: "#000000",
    feesTitleColor: "#000000",
    feesDescriptionColor: "#000000",
    backgroundType: "color",
    backgroundContent: "#FFFFFF",
  },
  roadmap: {
    title: "Roadmap",
    titleColor: "#000000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    descriptionColor: "#000000",
    phases: [
      {
        title: "Phase 1",
        visualType: "image",
        visualUrl: "assets/image-4.png",
        milestones: [
          {
            title: "Phase 1 Milestone 1",
            checked: false,
          },
          {
            title: "Phase 1 Milestone 2",
            checked: false,
          },
          {
            title: "Phase 1 Milestone 3",
            checked: false,
          },
          {
            title: "Phase 1 Milestone 4",
            checked: false,
          },
          {
            title: "Phase 1 Milestone 5",
            checked: false,
          },
        ],
      },
      {
        title: "Phase 2",
        visualType: "image",
        visualUrl: "assets/image-5.png",
        milestones: [
          {
            title: "Phase 2 Milestone 1",
            checked: false,
          },
          {
            title: "Phase 2 Milestone 2",
            checked: false,
          },
          {
            title: "Phase 2 Milestone 3",
            checked: false,
          },
          {
            title: "Phase 2 Milestone 4",
            checked: false,
          },
          {
            title: "Phase 2 Milestone 5",
            checked: false,
          },
        ],
      },
      {
        title: "Phase 3",
        visualType: "image",
        visualUrl: "assets/image-6.png",
        milestones: [
          {
            title: "Phase 3 Milestone 1",
            checked: false,
          },
          {
            title: "Phase 3 Milestone 2",
            checked: false,
          },
          {
            title: "Phase 3 Milestone 3",
            checked: false,
          },
          {
            title: "Phase 3 Milestone 4",
            checked: false,
          },
          {
            title: "Phase 3 Milestone 5",
            checked: false,
          },
        ],
      },
    ],
    phasesTitleColor: "#000000",
    milestonesTitleColor: "#000000",
    backgroundType: "color",
    backgroundContent: "#FFFFFF",
  },
  faq: {
    title: "FAQ",
    titleColor: "#000000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    descriptionColor: "#000000",
    questions: [
      {
        title: "What is ABC Coin?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        title: "When was ABC Coin fairlaunched?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        title: "How long is the liquidity locked?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        title: "What are the transaction fees?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    questionTitleColor: "#000000",
    questionAnswerColor: "#000000",
    backgroundType: "color",
    backgroundContent: "#FFFFFF",
  },
};

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
    enum: ["image", "video", "color"],
    required: true,
    default: "color",
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
    enum: ["image", "video", "color"],
    required: true,
    default: "color",
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
    enum: ["image", "video", "color"],
  },
  backgroundContent: {
    type: String,
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
  longDescription: {
    type: String,
    required: true,
  },
  longDescriptionColor: {
    type: String,
    default: "#000000",
  },
  features: {
    type: [featureSchema],
  },
  featuresTitleColor: {
    type: String,
    default: "#000000",
  },
  featuresDescriptionColor: {
    type: String,
    default: "#000000",
  },

  backgroundType: {
    type: String,
    enum: ["image", "video", "color"],
    required: true,
    default: "color",
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
    enum: ["image", "video", "color"],
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
  feePercentageColor: {
    type: String,
    default: "#000000",
  },
  feeTitleColor: {
    type: String,
    default: "#000000",
  },
  feeDescriptionColor: {
    type: String,
    default: "#000000",
  },
  backgroundType: {
    type: String,
    enum: ["image", "video", "color"],
    required: true,
    default: "color",
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
  phases: [{ type: phaseSchema }],
  phasesTitleColor: {
    type: String,
    default: "#000000",
  },
  milestonesTitleColor: {
    type: String,
    default: "#000000",
  },
  backgroundType: {
    type: String,
    enum: ["image", "video", "color"],
    required: true,
    default: "color",
  },
  backgroundContent: {
    type: String,
    required: true,
    default: "#FFFFFF",
  },
});

// FAQ

const questionSchema = {
  title: {
    type: String,
  },
  answer: {
    type: String,
  },
};

const faqSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "FAQ",
    required: true,
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
  questions: { type: [questionSchema] },
  questionsTitleColor: {
    type: String,
    default: "#000000",
  },
  questionsAnswerColor: {
    type: String,
    default: "#000000",
  },
  backgroundType: {
    type: String,
    enum: ["image", "video", "color"],
    required: true,
    default: "color",
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
    enum: ["image", "video", "color"],
    required: true,
    default: "color",
  },
  backgroundContent: {
    type: String,
    required: true,
    default: "#FFFFFF",
  },
});

// project

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
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
  faq: {
    type: faqSchema,
  },
  footer: {
    type: footerSchema,
  },
});

const Project = new mongoose.model("Project", projectSchema);

module.exports = Project;
