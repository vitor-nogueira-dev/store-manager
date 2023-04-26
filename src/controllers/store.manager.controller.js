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

module.exports = {
  getAllProducts,
  getById,
};
