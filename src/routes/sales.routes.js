const express = require('express');
const Middleware = require('../middlewares/store.manager.middleware');
const Controller = require('../controllers/store.manager.controller');

const router = express.Router();

router.get('/', Controller.getAllSales);
router.get('/:id', Controller.getSaleById);
router.post(
  '/',
  Middleware.verifyProductIdAndQuantity,
  Middleware.verifyQuantity,
  Controller.insertSalesController,
);
router.put(
  '/:id',
  Middleware.verifyProductIdAndQuantity,
  Middleware.verifyQuantity,
  Controller.updateSaleById,
);
router.delete('/:id', Controller.deleteSaleById);

module.exports = router;
