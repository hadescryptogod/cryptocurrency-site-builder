// import model
const Site = require("../models/site.model");
const Referral = require("../models/referral.model");
// import library
const slugify = require("slugify");
const crypto = require("crypto");

const SOLANA = require("@solana/web3.js");
const {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Keypair,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} = SOLANA;
const {
  NATIVE_MINT,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createSyncNativeInstruction,
  getAccount,
  createTransferInstruction,
  createCloseAccountInstruction,
} = require("@solana/spl-token");

const bs58 = require("bs58");
const e = require("cors");

const generateKey = async () => {
  const keyPair = Keypair.generate();

  const key = {
    publicKey: keyPair.publicKey.toString(),
    secretKey: Array.from(keyPair.secretKey),
    privateKey: bs58.default.encode(keyPair.secretKey),
  };

  return key;
};

// function to create site
exports.createSite = async (req, res, next) => {
  try {
    // generate key
    const key = await generateKey();

    console.log(key);

    // get referral by referralCode
    const referral = await Referral.findOne({ code: req.body.referralCode });

    // create site with req body payload

    let site;

    if (referral !== null) {
      console.log("CREATE SITE WITH REFERRAL");
      site = await Site.create({
        ...req.body,
        paymentAddress: key.publicKey,
        paymentAddressSecretKey: key.secretKey,
        paymentAddressPrivateKey: key.privateKey,
        referral: referral._id,
      });
    } else {
      console.log("CREATE SITE WITHOUT REFERRAL");
      console.log(req.body);
      site = await Site.create({
        ...req.body,
        paymentAddress: key.publicKey,
        paymentAddressSecretKey: key.secretKey,
        paymentAddressPrivateKey: key.privateKey,
      });
    }

    console.log(site);

    // return res with site data
    res.status(201).json({
      site: site,
    });
  } catch (err) {
    console.log(err);
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

// async function wrapSol(connection, wallet) {
//   const associatedTokenAccount = await getAssociatedTokenAddress(
//     NATIVE_MINT,
//     wallet.publicKey
//   );

//   const wrapTransaction = new Transaction().add(
//     createAssociatedTokenAccountInstruction(
//       wallet.publicKey,
//       associatedTokenAccount,
//       wallet.publicKey,
//       NATIVE_MINT
//     ),
//     SystemProgram.transfer({
//       fromPubkey: wallet.publicKey,
//       toPubkey: associatedTokenAccount,
//       lamports: LAMPORTS_PER_SOL / 2,
//     }),
//     createSyncNativeInstruction(associatedTokenAccount)
//   );
//   await sendAndConfirmTransaction(connection, wrapTransaction, [wallet]);

//   console.log("✅ - Step 2: SOL wrapped");
//   return associatedTokenAccount;
// }

// async function transferWrappedSol(
//   connection,
//   fromWallet,
//   toWallet,
//   fromTokenAccount
// ) {
//   const toTokenAccount = await getAssociatedTokenAddress(
//     NATIVE_MINT,
//     toWallet.publicKey
//   );

//   const transferTransaction = new Transaction().add(
//     createAssociatedTokenAccountInstruction(
//       fromWallet.publicKey,
//       toTokenAccount,
//       toWallet.publicKey,
//       NATIVE_MINT
//     ),
//     createTransferInstruction(
//       fromTokenAccount,
//       toTokenAccount,
//       fromWallet.publicKey,
//       LAMPORTS_PER_SOL / 2
//     )
//   );
//   const signature = await sendAndConfirmTransaction(
//     connection,
//     transferTransaction,
//     [fromWallet]
//   );

//   console.log("✅ - Step 3: Transferred wrapped SOL");
//   return signature;
// }

// async function unwrapSol(connection, wallet, tokenAccount) {
//   const unwrapTransaction = new Transaction().add(
//     createCloseAccountInstruction(
//       tokenAccount,
//       wallet.publicKey,
//       wallet.publicKey
//     )
//   );
//   await sendAndConfirmTransaction(connection, unwrapTransaction, [wallet]);
//   console.log("✅ - Step 4: SOL unwrapped");
// }

// Function to transfer SOL
async function transferSOL(connection, fromKeypair, toPublicKey, amount) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports: amount, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    })
  );

  try {
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      fromKeypair,
    ]);
    console.log("Transaction successful!", signature);
    return signature;
  } catch (error) {
    console.error("Error transferring SOL:", error);
  }
}

// function to check if payment is sent
exports.checkPayment = async (req, res, next) => {
  try {
    // get site by id
    const site = await Site.findById(req.params.siteId);

    // get payment address
    const paymentAddress = site.paymentAddress;

    console.log(paymentAddress);

    // check payment address balance

    const QUICKNODE_RPC =
      "https://red-dawn-pool.solana-mainnet.quiknode.pro/2920bd8830972689e937395697c32449a6768165"; // 👈 Replace with your QuickNode Endpoint OR clusterApiUrl('mainnet-beta')
    const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, "confirmed");
    const WALLET_ADDRESS = paymentAddress; //👈 Replace with your wallet address

    console.log(WALLET_ADDRESS);

    let balance = await SOLANA_CONNECTION.getBalance(
      new PublicKey(WALLET_ADDRESS)
    );
    console.log(`Wallet Balance: ${balance / LAMPORTS_PER_SOL}`);

    let paid = site.paid;

    if (balance / LAMPORTS_PER_SOL >= 0.1) {
      const secret = site.paymentAddressSecretKey;
      const senderWallet = Keypair.fromSecretKey(new Uint8Array(secret));
      const receiverWallet = Keypair.fromSecretKey(
        new Uint8Array([
          63, 82, 155, 145, 191, 217, 229, 38, 15, 101, 241, 112, 246, 150, 125,
          147, 131, 167, 71, 68, 73, 45, 187, 76, 167, 221, 99, 195, 200, 98,
          146, 50, 167, 194, 123, 144, 196, 194, 250, 173, 67, 160, 190, 23,
          223, 129, 82, 117, 128, 228, 238, 64, 150, 101, 103, 6, 170, 94, 212,
          197, 171, 232, 197, 154,
        ])
      );

      // 1.

      // console.log(senderWallet);
      // const tokenAccount1 = await wrapSol(SOLANA_CONNECTION, senderWallet);
      // const _txHash = await transferWrappedSol(
      //   SOLANA_CONNECTION,
      //   senderWallet,
      //   receiverWallet,
      //   tokenAccount1
      // );
      // await unwrapSol(SOLANA_CONNECTION, senderWallet, tokenAccount1);
      // const tokenAccount2 = await wrapSol(SOLANA_CONNECTION, receiverWallet);
      // await unwrapSol(SOLANA_CONNECTION, receiverWallet, tokenAccount2);

      // 2.

      // const transaction = new Transaction().add(
      //   SystemProgram.transfer({
      //     fromPubkey: senderWallet,
      //     toPubkey: receiverWallet.publicKey,
      //     lamports: balance,
      //   })
      // );

      // console.log(senderWallet, receiverWallet.publicKey, balance);

      // const signature = await sendAndConfirmTransaction(
      //   SOLANA_CONNECTION,
      //   transaction,
      //   [senderWallet]
      // );

      // 3.
      // Example usage

      let commission;
      let referral;

      if (site.referral) {
        // get referral
        referral = await Referral.findById(site.referral);

        // Calculate commission
        commission =
          (balance / LAMPORTS_PER_SOL) * (referral.commissionPercentage / 100);
      }

      // Send payment to main wallet
      const toPublicKey = receiverWallet.publicKey; // Replace with recipient's public key
      const amountInSol = 0.1 - commission - 0.00001; // Amount to transfer in SOL
      const amountInLamports = amountInSol * 1000000000;

      const transactionHash = await transferSOL(
        SOLANA_CONNECTION,
        senderWallet,
        toPublicKey,
        amountInLamports
      );

      console.log(`${amountInSol} sent to ${toPublicKey}`);

      // Send commission to referral
      const toReferralPublicKey = new PublicKey(referral.walletAddress); // Replace with recipient's public key
      const commissionAmountInSol =
        balance / LAMPORTS_PER_SOL - amountInSol - 0.00001; // Amount to transfer in SOL
      console.log(commissionAmountInSol);
      const commissionAmountInLamports = parseInt(
        commissionAmountInSol * 1000000000
      );

      const referralTransactionHash = await transferSOL(
        SOLANA_CONNECTION,
        senderWallet,
        toReferralPublicKey,
        commissionAmountInLamports
      );

      console.log(`${commissionAmountInSol} sent to ${toReferralPublicKey}`);

      let updatedSite;

      if (site.referral) {
        await Referral.findOneAndUpdate(
          { _id: referral._id },
          {
            count: referral.count + 1,
            commissionsEarned:
              referral.commissionsEarned + commissionAmountInSol,
          },
          {
            new: true,
            runValidators: true,
          }
        );

        updatedSite = await Site.findOneAndUpdate(
          { _id: site._id },
          {
            paid: true,
            transactionHash: transactionHash,
            referralTransactionHash: referralTransactionHash,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      } else {
        updatedSite = await Site.findOneAndUpdate(
          { _id: site._id },
          {
            paid: true,
            transactionHash: transactionHash,
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }

      paid = updatedSite.paid;
    }

    res.status(200).json({ paid: paid, balance: balance / LAMPORTS_PER_SOL });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ err });
  }
};
