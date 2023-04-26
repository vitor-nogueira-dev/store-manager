const Model = require('../models');

const getAllProducts = async () => {
  const products = await Model.getAllProducts();
  if (!products) {
    return { type: 'ERROR', statusCode: 404, message: 'Products Not Found' };
  }
  return { type: 'SUCCESS', statusCode: 200, message: products };
};

const getProductById = async (id) => {
  const product = await Model.getProductById(id);
  console.log(product, ' to aqui');
  if (!product) {
    return { type: 'ERROR', statusCode: 404, message: 'Product not found' };
  }
  return { type: 'SUCCESS', statusCode: 200, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};
