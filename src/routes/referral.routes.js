// import library
const express = require("express");

// import controller
const referralController = require("../controllers/referral.controller");

// init router
const router = express.Router();

// create referral
router.post("/", referralController.createReferral);

// get all referrals
router.get("/", referralController.getAllReferrals);

module.exports = router;
