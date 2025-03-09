// import library
const express = require("express");

// import controller
const siteController = require("../controllers/site.controller");

// init router
const router = express.Router();

// create site
router.post("/", siteController.createSite);

// get all sites
router.get("/", siteController.getAllSites);

// get site by slug ex. abc-coin-1
router.get("/:slug", siteController.getSiteBySlug);

// get site by id ex. 67c0c121805fac691713b0b8
router.get("/:siteId/id", siteController.getSiteById);

// update site by slug
router.patch("/:slug", siteController.updateSiteBySlug);

// delete site by slug
router.delete("/:slug", siteController.deleteSiteBySlug);

// delete site by id
router.delete("/:siteId/id", siteController.deleteSiteById);

// generate slug
router.post("/generate_slug", siteController.generateSlug);

// check payment
router.post("/check_payment", siteController.checkPayment);

module.exports = router;
