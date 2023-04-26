const express = require('express');
const Controller = require('../controllers/index');
const Middleware = require('../middlewares/index');

const router = express.Router();

router.get('/:id', Controller.getById);
router.get('/', Controller.getAllProducts);
router.post('/', Middleware.validName, Controller.insertProductController);
router.put('/:id', Middleware.validName, Controller.updateProductById);

module.exports = router;
