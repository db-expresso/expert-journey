'use strict';

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        trim: true,
        min:5,
        max:30,
        required:true
    },
    productId:{
        type:String,
        min:3,
        max:8,
        unique:true,
        index: true,
        lowercase:true
    },
    price:{
        type: Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('product');