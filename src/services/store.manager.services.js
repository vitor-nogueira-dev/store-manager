const Model = require('../models');
const helpers = require('../helpers');

const getAllProducts = async () => {
  const products = await Model.getAllProducts();
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

const updateProductById = async (id, newName) => {
  const update = await Model.updateProductById(id, newName);
  if (!update) { return { type: 'ERROR', statusCode: 404, message: 'Product not found' }; }
  return {
    type: 'SUCCESS',
    statusCode: 200,
    message: { id, name: newName },
  };
};

const deleteProductById = async (id) => {
  const deleteProduct = await Model.deleteProductById(id);
  if (!deleteProduct) { return { type: 'ERROR', statusCode: 404, message: 'Product not found' }; }
  return { type: 'SUCCESS', statusCode: 204, message: null };
};

const getAllSales = async () => {
  const sales = await Model.getAllSales();
  return { type: 'SUCCESS', statusCode: 200, message: sales };
};

const getSaleById = async (id) => {
  const sale = await Model.getSaleById(id);
  console.log(sale, 'sale fora');

  if (sale.length === 0) {
    console.log(sale, 'sale');
    return { type: 'ERROR', statusCode: 404, message: 'Sale not found' };
  }
  return { type: 'SUCCESS', statusCode: 200, message: sale };
};

const insertSales = async (arrayBody) => {
  const allProducts = await Model.getAllProducts();
  const verifica = helpers.verifyProductId(allProducts, arrayBody);

  if (!verifica) {
    return { type: 'ERROR', statusCode: 404 };
  }

  const insertId = await Model.insertDateSales();
  const message = await helpers.insertedSales(arrayBody, insertId);

  return { type: 'SUCCESS', statusCode: 201, message };
};

const deleteSaleById = async (id) => {
  const deleteSale = await Model.deleteSaleById(id);
  if (deleteSale === 0) { return { type: 'ERROR', statusCode: 404 }; }
  return { type: 'SUCCESS', statusCode: 204, message: null };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertSales,
  getAllSales,
  getSaleById,
  updateProductById,
  deleteProductById,
  deleteSaleById,
};
