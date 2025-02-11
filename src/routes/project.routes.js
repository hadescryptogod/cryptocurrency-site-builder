// import library
const express = require("express");

// import controller
const projectController = require("../controllers/project.controller");

// init router
const router = express.Router();

router.post("/", projectController.createProject);

module.exports = router;
