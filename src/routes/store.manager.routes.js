const express = require('express');
const Controller = require('../controllers/index');
const Middleware = require('../middlewares/index');

const router = express.Router();

router.get('/search', Controller.searchByQuery);
router.get('/:id', Controller.getById);
router.get('/', Controller.getAllProducts);
router.post('/', Middleware.validName, Controller.insertProductController);
router.put('/:id', Middleware.validName, Controller.updateProductById);
router.delete('/:id', Controller.deleteProductById);

module.exports = router;
