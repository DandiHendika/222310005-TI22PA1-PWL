const express = require("express");
const {
  getMessageData,
  sendMessageData,
  updateMessageData,
  deleteMessageData,
} = require("../controllers/MessengersController");
const route = express.Router();

route.get("/", getMessageData);
route.post("/", sendMessageData);
route.put('/:id', updateMessageData);
route.delete('/:id', deleteMessageData);
module.exports = route;
