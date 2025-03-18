// import library
const express = require("express");

// import controller
const tokenController = require("../controllers/token.controller");

// init router
const router = express.Router();

// get token data
router.get(
  "/:tokenNetwork/:tokenContractAddress",
  tokenController.getTokenData
);

module.exports = router;
