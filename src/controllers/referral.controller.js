// import model
const Referral = require("../models/referral.model");

// import library
const slugify = require("slugify");
const crypto = require("crypto");

// function to create referral
exports.createReferral = async (req, res, next) => {
  try {
    // create referral with req body payload
    const referral = await Referral.create({
      ...req.body,
    });

    // return res with referral data
    res.status(201).json({
      referral: referral,
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// function to get all referrals
exports.getAllReferrals = async (req, res, next) => {
  try {
    // get all referrals
    const referrals = await Referral.find();

    // return res with all referral data
    res.status(200).json({ referrals: referrals });
  } catch (err) {
    res.status(500).json({ err });
  }
};
