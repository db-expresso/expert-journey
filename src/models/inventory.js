'use strict';

const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    inventoryName:{
        type:String,
        trim: true,
        min:5,
        max:30,
        required:true
    },
    inventoryId:{
        type:String,
        unique:true,
        index: true,
        lowercase:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Inventory', inventorySchema);