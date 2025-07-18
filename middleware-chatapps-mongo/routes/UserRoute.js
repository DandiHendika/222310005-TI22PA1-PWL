const express = require("express");
const route = express.Router();
const {
  getAllData,
  checkConnection,
  submitData,
  getById,
  deleteData,
  signIn,
} = require("../controllers/UserController");

route.get("/", getAllData);
route.post("/", submitData);
route.get("/:id", getById);
route.delete("/:id", deleteData);

route.post("/signin", signIn);

route.get("/check", checkConnection);

module.exports = route;
