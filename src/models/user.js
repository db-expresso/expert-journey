"use strict";

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  emailAddress: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  hash_password: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  role: {
    type: String,
    required: true,
    enum:['admin','user'],
    default: 'admin'
  },
});

module.exports = mongoose.model("user");
