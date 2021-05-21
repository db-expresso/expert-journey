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
  console.log(req.params);
  //const { inventoryName, inventoryId, quantity } = req.body;
  //const id = req.params.id;
  const item = await inventory.findOne({inventoryId: req.params.inventoryId}).exec();
  console.log(item);
  if (!item) {
    return res.status(400).json({ message: "Inventory not found" });
  } else {
    await inventory.findByIdAndDelete(item._id);
    res.status(200).json({ message: "Inventory deleted" });
  }
};

exports.updateInventory = (req, res) => {
  const { inventoryName, inventoryId, quantity } = req.body;
  if (item) {
  }
};
