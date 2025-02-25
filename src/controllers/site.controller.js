// import model
const Site = require("../models/site.model");

// function to create site
exports.createSite = async (req, res, next) => {
  try {
    // create site with req body payload
    const site = await Site.create(req.body);

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
exports.deleteSiteBySlug = async (req, res, next) => {};
