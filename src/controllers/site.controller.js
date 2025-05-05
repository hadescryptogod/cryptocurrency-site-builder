// import model
const Site = require("../models/site.model");
const Referral = require("../models/referral.model");
// import library
const slugify = require("slugify");
const crypto = require("crypto");
const { Web3 } = require("web3");

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs");
const { abi, bytecode } = JSON.parse(fs.readFileSync("PaymentIntent.json"));

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
    // console.log(await deployTx.estimateGas());
    const deployedContract = await deployTx
      .send({
        from: signer.address,
        // gas: await deployTx.estimateGas(),
        gas: 1000000,
      })
      .once("transactionHash", (txhash) => {
        console.log(`Mining deployment transaction ...`);
        console.log(`https://testnet.bscscan.com/tx/${txhash}`);
      });

    // The contract is now deployed on chain!
    // console.log(`Contract deployed at ${deployedContract.options.address}`);
    // console.log(
    //   `Add DEMO_CONTRACT to the .env file to store the contract address: ${deployedContract.options.address}`
    // );

    // get referral by referralCode
    const referral = await Referral.findOne({ code: req.body.referralCode });

    console.log(
      "INFURA_API_KEY" + process.env.INFURA_API_KEY,
      "signer.address" + signer.address
    );

    if (referral !== null) {
      console.log("SET REFERRAL");
      try {
        // Creating a Contract instance
        const contract = new web3.eth.Contract(
          abi,
          // Replace this with the address of your deployed contract
          deployedContract.options.address
        );
        // Issuing a transaction that calls the `echo` method
        const method_abi = contract.methods
          .setReferral(referral.walletAddress, referral.commissionPercentage)
          .encodeABI();
        const tx = {
          from: signer.address,
          to: contract.options.address,
          data: method_abi,
          value: "0",
          gasPrice: "100000000000",
        };
        const gas_estimate = await web3.eth.estimateGas(tx);
        tx.gas = gas_estimate;

        const signedTx = await web3.eth.accounts.signTransaction(
          tx,
          signer.privateKey
        );
        console.log("Raw transaction data: " + signedTx.rawTransaction);
        // Sending the transaction to the network
        const receipt = await web3.eth
          .sendSignedTransaction(signedTx.rawTransaction)
          .once("transactionHash", (txhash) => {
            console.log(`Mining transaction ...`);
            console.log(`https://bscscan.com/tx/${txhash}`);
          });
        // The transaction is now on chain!
        console.log(`Mined in block ${receipt.blockNumber}`);
      } catch (err) {
        console.log(err.message);
        return;
      }
    }

    // create site with req body payload

    let site;

    if (referral !== null) {
      console.log("CREATE SITE WITH REFERRAL");
      site = await Site.create({
        ...req.body,
        paymentContractAddress: deployedContract.options.address,
        referral: referral._id,
      });
    } else {
      console.log("CREATE SITE WITHOUT REFERRAL");
      console.log(req.body);
      site = await Site.create({
        ...req.body,
        paymentContractAddress: deployedContract.options.address,
      });
    }

    // console.log(site);

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

// token contract
const tokenContract = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

// function to check if payment is sent
exports.checkPayment = async (req, res, next) => {
  // get site by id
  const site = await Site.findById(req.params.siteId);
  const paymentContractAddress = site.paymentContractAddress;
  // A USDT token holder
  const tokenHolder = paymentContractAddress;
  const contract = new web3.eth.Contract(balanceOfABI, tokenContract);
  const result = await contract.methods.balanceOf(tokenHolder).call();
  const formattedResult = web3.utils.fromWei(result, "ether");
  console.log(formattedResult);
  let paid = site.paid;
  if (Number(formattedResult) >= 0.1) {
    // Creating a Contract instance
    const contract = new web3.eth.Contract(
      abi,
      // Replace this with the address of your deployed contract
      paymentContractAddress
    );
    // Issuing a transaction that calls the `echo` method
    const method_abi = contract.methods.withdraw(tokenContract).encodeABI();
    const tx = {
      from: signer.address,
      to: contract.options.address,
      data: method_abi,
      value: "0",
      gasPrice: "100000000000",
    };
    const gas_estimate = await web3.eth.estimateGas(tx);
    tx.gas = gas_estimate;
    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      signer.privateKey
    );
    console.log("Raw transaction data: " + signedTx.rawTransaction);
    let _txHash;
    // Sending the transaction to the network
    const receipt = await web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .once("transactionHash", (txHash) => {
        console.log(`Mining transaction ...`);
        console.log(`https://testnet.bscscan.com/tx/${txHash}`);
        _txHash = txHash;
      });
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);

    // update site by id
    const updatedSite = await Site.findOneAndUpdate(
      { _id: site._id },
      { paid: true, transactionHash: _txHash },
      {
        new: true,
        runValidators: true,
      }
    );
    paid = updatedSite.paid;
    console.log(updatedSite.transactionHash);
  }

  res.status(200).json({ paid: paid, balance: formattedResult });
};
