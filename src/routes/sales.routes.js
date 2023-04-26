const express = require('express');
const Middleware = require('../middlewares/index');
const Controller = require('../controllers/index');

const router = express.Router();

router.post(
  '/',
  Middleware.verifyProductIdAndQuantity,
  Middleware.verifyQuantity,
  Controller.insertSalesController,
);

module.exports = router;
