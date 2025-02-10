// import libraries
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// init express
const app = express();

// morgan middleware
app.use(morgan("dev"));

// cors middleware
app.use(cors());

// parse json body request
app.use(express.json());

module.exports = app;
