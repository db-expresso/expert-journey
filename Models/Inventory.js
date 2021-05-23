const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'an item name is required!'],
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
  },
  quantity:{
    type: Number,
    required: [true, 'an item quantity is required!'],
  },
  amount: {
    type: Number,
    required: [true, 'A item amount is required!'],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
