const Inventory = require('../Models/Inventory');
const APIFeatures = require('../utils/apiFeatures');

class InventoryService {
  static async create(req) {
    return await Inventory.create({
      name: req.name,
      business: req.business,
      quantity: req.quantity,
      amount: req.amount,
    });
  }

  static async getOne(params) {
    const query = await Inventory.findOne(params).populate({path: 'business'});
    return await query;
  }

  static async update(params) {
    return await Inventory.findOneAndUpdate({ business: params.business }, params, {
      new: true,
      runValidators: true,
    }).populate({path: 'business'});
  }

  static async getAll(req, params) {
    const features = new APIFeatures(Inventory.find(params), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    features.query = features.query.populate({path: 'business'});
    return await features.query;
  }

  static async delete(params){
    const query = await Inventory.findOneAndDelete(params);

    return await query;
  }
}

module.exports = InventoryService;
