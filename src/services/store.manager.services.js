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

const insertProduct = async (product) => {
  const newProduct = await Model.insertProduct(product);
  if (!newProduct) {
    return { type: 'ERROR', statusCode: 400, message: 'Bad Request' };
  }
  return {
    type: 'SUCCESS',
    statusCode: 201,
    message: { id: newProduct, name: product },
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
};
