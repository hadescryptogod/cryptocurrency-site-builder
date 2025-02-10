// import library
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");

// import .env
dotenv.config({ path: path.join(__dirname, ".env") });

// import app
const app = require("./app");

// connect to MongoDB
const db = process.env.MONGODB_ATLAS_CONNECTION;
mongoose.connect(db).then(() => {
  console.log(`Connected to MongoDB Atlas`);
});

const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
