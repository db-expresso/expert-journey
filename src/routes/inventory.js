"use strict";

const express = require("express");
const router = express.Router();
const {
  createInventory,
  deleteInventory,
  updateInventory,
} = require("../controllers/inventory");


router.post("/create-inventory", createInventory);
router.delete("/delete-inventory/:inventoryId", deleteInventory);
router.put('/update-inventory/:inventoryId',updateInventory)

module.exports = router;
