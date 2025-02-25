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

// update site by slug
router.patch("/:slug", siteController.updateSiteBySlug);

// delete site by slug
router.delete("/:slug", siteController.deleteSiteBySlug);

module.exports = router;
