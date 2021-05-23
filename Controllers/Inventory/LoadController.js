const inventoryService = require('../../Services/Inventory');

class LoadController {
  static async create(req, res) {
    const inventoryParams = {
      name: req.body.name,
      business: req.business,
      quantity: req.body.quantity,
      amount: req.body.amount,
    };
    const inventory = await inventoryService.create(inventoryParams);

    return res.status(201).json({
      status: 'success',
      message: 'Inventory created Successfully',
      data: inventory,
    });
  }

  static async getAll(req, res) {
    const inventories = await inventoryService.getAll(req, {business: req.business});

    return res.status(201).json({
      status: 'success',
      message: 'Inventories Fetched Successfully',
      data: inventories,
    });
  }

  static async getOne(req, res) {
    const inventory = await inventoryService.getOne({ _id: req.params.id, business: req.business });

    return res.status(201).json({
      status: 'success',
      message: 'Inventory Fetched Successfully',
      data: inventory,
    });
  }

  static async update(req, res) {
    const inventoryParams = {
      name: req.body.name,
      business: req.business,
      quantity: req.body.quantity,
      amount: req.body.amount,
    };
    const inventory = await inventoryService.update(inventoryParams);

    return res.status(201).json({
      status: 'success',
      message: 'Inventory updated Successfully',
      data: inventory,
    });
  }

  static async delete(req, res) {
    const inventory = await inventoryService.delete({ _id: req.params.id, business: req.business });

    return res.status(201).json({
      status: 'success',
      message: 'Inventory Deleted Successfully',
      data: [],
    });
  }
}

module.exports = LoadController;
