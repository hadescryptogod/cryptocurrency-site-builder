// import model
const Site = require("../models/site.model");

// import library
const slugify = require("slugify");
const crypto = require("crypto");

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
