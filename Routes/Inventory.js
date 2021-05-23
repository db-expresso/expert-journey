const express = require('express');
const inventoryController = require('../Controllers/Inventory/LoadController');
const catchAsync = require('../utils/catchAsync');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.route('/').post(catchAsync(authGuard.protect), catchAsync(inventoryController.create));

router
  .route('/:id')
  .get(catchAsync(authGuard.protect), catchAsync(inventoryController.getOne));

router
  .route('/')
  .get(catchAsync(authGuard.protect), catchAsync(inventoryController.getAll));

router
  .route('/:id')
  .patch(catchAsync(authGuard.protect), catchAsync(inventoryController.update));

router
  .route('/:id')
  .delete(catchAsync(authGuard.protect), catchAsync(inventoryController.delete));
module.exports = router;
