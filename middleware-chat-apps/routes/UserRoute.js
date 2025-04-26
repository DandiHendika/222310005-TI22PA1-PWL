const express = require('express');
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.index);
router.post("/create", UserController.createData);
router.get("/fetch-all", UserController.getAll);
router.get("/:id", UserController.getByID);
router.put("/update", UserController.updatedData);
router.delete("/delete", UserController.deleteData);

module.exports = router;