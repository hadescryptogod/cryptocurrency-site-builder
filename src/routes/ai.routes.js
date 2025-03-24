// import library
const express = require("express");

// import controller
const aiController = require("../controllers/ai.controller");

// init router
const router = express.Router();

// generate content
router.post("/generate_content", aiController.generateContent);

// generate images
router.post("/generate_images", aiController.generateImages);

module.exports = router;
