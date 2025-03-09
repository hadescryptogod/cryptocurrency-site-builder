// import model
const Site = require("../models/site.model");

// import library
const slugify = require("slugify");
const crypto = require("crypto");
const { Web3 } = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("Demo.json"));

// Configuring the connection to an Ethereum node
const network = process.env.NETWORK;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
  )
);

// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
  "0x" + process.env.SIGNER_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(signer);

// function to create site
exports.createSite = async (req, res, next) => {
  try {
    // Using the signing account to deploy the contract
    const contract = new web3.eth.Contract(abi);
    contract.options.data = bytecode;
    const deployTx = contract.deploy();
    const deployedContract = await deployTx
      .send({
        from: signer.address,
        gas: await deployTx.estimateGas(),
      })
      .once("transactionHash", (txhash) => {
        console.log(`Mining deployment transaction ...`);
        console.log(`https://testnet.bscscan.com/tx/${txhash}`);
      });
    // The contract is now deployed on chain!
    console.log(`Contract deployed at ${deployedContract.options.address}`);
    // console.log(
    //   `Add DEMO_CONTRACT to the .env file to store the contract address: ${deployedContract.options.address}`
    // );

    // create site with req body payload
    const site = await Site.create({
      ...req.body,
      paymentContractAddress: deployedContract.options.address,
    });

    // return res with site data
    res.status(201).json({
      site: site,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// function to get all sites
exports.getAllSites = async (req, res, next) => {
  try {
    // get all sites
    const sites = await Site.find();

    // return res with all sites data
    res.status(200).json({ sites: sites });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to get site by slug ex. abc-coin
exports.getSiteBySlug = async (req, res, next) => {
  try {
    // get site by slug
    const site = await Site.findOne({ slug: req.params.slug });

    // check if site exists
    if (!site) return res.status(404).json({ message: "Site not found." });

    // return res with site data
    res.status(200).json({
      site: site,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to get site by id ex. 67c0c121805fac691713b0b8
exports.getSiteById = async (req, res, next) => {
  try {
    // get site by id
    const site = await Site.findById(req.params.siteId);

    // check if site exists
    if (!site) return res.status(404).json({ message: "Site not found." });

    // return res with site data
    res.status(200).json({
      site: site,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to update site by slug ex. abc-coin
exports.updateSiteBySlug = async (req, res, next) => {
  try {
    // update site by slug
    const site = await Site.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // check if site exists
    if (!site) return res.status(404).json({ message: "Site not found." });

    res.status(200).json({
      site: site,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to delete site by slug ex. abc-coin
exports.deleteSiteBySlug = async (req, res, next) => {
  try {
    // update site by slug
    const site = await Site.findOneAndDelete({ slug: req.params.slug });

    // check if site exists
    if (!site) return res.status(404).json({ message: "Site not found." });

    res.status(200).json({
      site: site,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to delete site by id ex. 67c0c121805fac691713b0b8
exports.deleteSiteById = async (req, res, next) => {
  try {
    // update site by id
    const site = await Site.findByIdAndDelete(req.params.siteId);

    // check if site exists
    if (!site) return res.status(404).json({ message: "Site not found." });

    res.status(200).json({
      site: site,
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

// function to generate slug
exports.generateSlug = async (req, res, next) => {
  try {
    if (req.body.projectName.trim() === "")
      return res.status(200).json({ slug: "" });

    // check if site exists with same site name
    const site = await Site.findOne({
      name: { $regex: new RegExp(req.body.projectName.trim(), "i") },
    });

    let slug;

    // if site doesn't exists
    if (!site) {
      slug = slugify(req.body.projectName, { lower: true });
    }
    // if site exists
    else {
      slug =
        slugify(req.body.projectName, { lower: true }) +
        "-" +
        crypto.randomBytes(3).toString("hex");
    }

    res.status(200).json({ slug: slug });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const balanceOfABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

// USDT token contract
const tokenContract = "0x55d398326f99059ff775485246999027b3197955";

// function to check if payment is sent
exports.checkPayment = async (req, res, next) => {
  // A USDT token holder
  const tokenHolder = "0x88a1493366D48225fc3cEFbdae9eBb23E323Ade3";
  const contract = new web3.eth.Contract(balanceOfABI, tokenContract);
  const result = await contract.methods.balanceOf(tokenHolder).call();
  const formattedResult = web3.utils.fromWei(result, "ether");
  console.log(formattedResult);
};
