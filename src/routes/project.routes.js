// import library
const express = require("express");

// import controller
const projectController = require("../controllers/project.controller");

// init router
const router = express.Router();

// create project
router.post("/", projectController.createProject);

// get all projects
router.get("/", projectController.getAllProjects);

// get project by slug ex. abc-coin-1
router.get("/:slug", projectController.getProjectBySlug);

// update project by slug
router.patch("/:slug", projectController.updateProjectBySlug);

module.exports = router;
