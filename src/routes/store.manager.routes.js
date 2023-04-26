const express = require('express');
const Controller = require('../controllers/index');

const router = express.Router();

router.get('/:id', Controller.getById);
router.get('/', Controller.getAllProducts);

module.exports = router;
