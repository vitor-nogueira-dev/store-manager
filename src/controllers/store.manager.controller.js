const Service = require('../services');

const getAllProducts = async (_req, res) => {
  const { type, statusCode, message } = await Service.getAllProducts();
  if (type === 'ERROR') {
    return res.status(statusCode).json(message);
  }
  return res.status(statusCode).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, statusCode, message } = await Service.getProductById(+id);
  console.log(message, 'to aqui message');
  if (type === 'ERROR') {
    return res.status(statusCode).json({ message: 'Product not found' });
  }

  return res.status(statusCode).json(message);
};

const insertProductController = async (req, res) => {
  const { name } = req.body;
  const { type, statusCode, message } = await Service.insertProduct(name);
  console.log(type, 'type', message, 'message');
  if (type === 'ERROR') {
    return res
      .status(statusCode)
      .json('"name" length must be at least 5 characters long');
  }
  return res.status(statusCode).json(message);
};
const getAllSales = async (_req, res) => {
  const { type, statusCode, message } = await Service.getAllSales();
  if (type === 'ERROR') {
    return res.status(statusCode).json({ message: 'Sale not found' });
  }
  return res.status(statusCode).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, statusCode, message } = await Service.getSaleById(+id);
  console.log(message.length, 'to aqui message');
  if (type === 'ERROR') {
    return res.status(statusCode).json({ message: 'Sale not found' });
  }
  return res.status(statusCode).json(message);
};

const insertSalesController = async (req, res) => {
  const arrayBody = req.body;
  console.log(arrayBody, 'aqui');

  const { type, statusCode, message } = await Service.insertSales(arrayBody);
  if (type === 'ERROR') {
    return res.status(statusCode).json({ message: 'Product not found' });
  }
  return res.status(statusCode).json(message);
};

module.exports = {
  getAllProducts,
  getById,
  insertProductController,
  insertSalesController,
  getAllSales,
  getSaleById,
};
