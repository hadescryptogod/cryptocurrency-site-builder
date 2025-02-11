// import libraries
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// import routes
const projectRoutes = require("./src/routes/project.routes");

// init express
const app = express();

// morgan middleware
app.use(morgan("dev"));

// cors middleware
app.use(cors());

// parse json body request
app.use(express.json());

// routes
app.use("/v1/projects", projectRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "success" });
});

module.exports = app;
