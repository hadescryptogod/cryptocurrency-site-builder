// import library
const express = require("express");

// import controller
const projectController = require("../controllers/project.controller");

// init router
const router = express.Router();

// create project
router.post("/", projectController.createProject);

// get project by slug ex. abc-coin-1
router.get("/:slug", project.getProjectBySlug);

// update project by slug
router.patch("/:slug", project.updateProjectBySlug);

module.exports = router;
