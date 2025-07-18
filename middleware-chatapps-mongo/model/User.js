const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    nip: String,
    fullname: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
