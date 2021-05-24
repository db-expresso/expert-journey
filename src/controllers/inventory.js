"use strict";

const inventory = require("../models/inventory");

exports.createInventory = (req, res) => {
  const { inventoryName, inventoryId, quantity } = req.body;

  const item = new inventory({
    inventoryName: inventoryName,
    inventoryId: inventoryId,
    quantity: quantity,
  });

  item.save((error, item) => {
    if (error) return res.status(400).json({ error });
    if (item) {
      res.status(201).json({ item });
    }
  });
};

exports.deleteInventory = async (req, res) => {
  const item = await inventory
    .findOne({ inventoryId: req.params.inventoryId })
    .exec();

  if (!item) {
    return res.status(400).json({ message: "Inventory not found" });
  } else {
    await inventory.findByIdAndDelete(item._id);
    res.status(200).json({ message: "Inventory deleted" });
  }
};

exports.updateInventory = async (req, res) => {
  const item = inventory
    .findOne({ inventoryId: req.params.inventoryId })
    .exec();
  if (!item) {
    res.status(400).json({ message: "Inventory not found" });
  } else {
    await inventory.findByIdAndUpdate(item._id, {
      inventoryName: req.body.inventoryName,
      quantity: req.body.quantity,
    });
    res.status(201).json({ message: "Successful Update" });
  }
};

exports.searchInventory = async (req, res) => {
  const item = await inventory
    .findOneAndUpdate({ inventoryId: req.params.inventoryId })
    .exec();
  if (!item) {
    res.status(400).json({ message: "Inventory not found" });
  } else {
    res.status(201).json({ item });
  }
};

exports.listAllInvetory = async (req, res) => {
  const item = await inventory.find().exec();
  if (!item) {
    res.status(400).json({ message: "Inventory not found" });
  } else {
    res.status(201).json({ item });
  }
};
