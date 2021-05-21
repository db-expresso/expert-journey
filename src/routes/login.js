"use strict";

const express = require("express");
const router = express.Router();
const { signup, login, profile } = require("../controllers/auth");
const { requireSignin } = require("../middlewares");

router.post("/signup", signup);
router.post("/login", login);
router.post("/login/profile", requireSignin, profile);

module.exports = router;
