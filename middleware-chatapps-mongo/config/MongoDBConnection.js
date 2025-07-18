require("dotenv").config();
const mongoose = require("mongoose");

const DBConnect = () => {
  mongoose.connect(process.env.MONGODB_API);
  console.log("Database Conected!");
};

module.exports = DBConnect;
