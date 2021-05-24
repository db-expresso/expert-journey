"use strict";

const express = require("express");
const router = express.Router();
const {
  createInventory,
  deleteInventory,
  updateInventory,
  searchInventory,
  listAllInvetory,
} = require("../controllers/inventory");

router.post("/create-inventory", createInventory);
router.delete("/delete-inventory/:inventoryId", deleteInventory);
router.put("/update-inventory/:inventoryId", updateInventory);
router.post("/search/:inventoryId", searchInventory);
router.get('/list-all',listAllInvetory);

module.exports = router;
