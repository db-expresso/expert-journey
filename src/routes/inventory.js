"use strict";

const express = require("express");
const router = express.Router();
const {
  createInventory,
  deleteInventory,
} = require("../controllers/inventory");

router.post("/create-inventory", createInventory);
router.delete("/delete-inventory/:inventoryId", deleteInventory);

module.exports = router;
