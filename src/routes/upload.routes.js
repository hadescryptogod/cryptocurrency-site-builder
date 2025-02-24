// import library
const express = require("express");

// import controller
const uploadController = require("../controllers/upload.controller");

// init router
const router = express.Router();

// upload file
router.post(
  "/",
  uploadController.upload.single("uploaded_file"),
  uploadController.uploadFile
);

module.exports = router;
