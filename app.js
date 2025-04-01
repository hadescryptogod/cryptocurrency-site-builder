// import libraries
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// import routes
const uploadRoutes = require("./src/routes/upload.routes");
const siteRoutes = require("./src/routes/site.routes");
const tokenRoutes = require("./src/routes/token.routes");
const aiRoutes = require("./src/routes/ai.routes");
const referralRoutes = require("./src/routes/referral.routes");

// init express
const app = express();

// morgan middleware
app.use(morgan("dev"));

// cors middleware
app.use(cors());

// parse json body request
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

// routes
app.use("/v1/uploads", uploadRoutes);
app.use("/v1/sites", siteRoutes);
app.use("/v1/tokens", tokenRoutes);
app.use("/v1/ai", aiRoutes);
app.use("/v1/referral", referralRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ status: "success" });
});

module.exports = app;
