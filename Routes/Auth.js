const express = require('express');

const router = express.Router();
const authController = require('../Controllers/Auth/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

router
  .route('/business')
  .post(authGuard.guest, catchAsync(authController.signUp));
router.route('/login').post(authGuard.guest, catchAsync(authController.login));
router.route('/logout').get(authController.logout);
router.route('/verify/:token').get(catchAsync(authController.verify));
//For Admin Creation
router
  .route('/getBusiness')
  .get(
    catchAsync(authGuard.protect),
    authController.getMe,
    catchAsync(authController.getBusiness)
  );

module.exports = router;
