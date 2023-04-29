const Model = require('../models/store.manager.models');
const Helpers = require('../helpers/functions');
const { PRODUCT_NOT_FOUND, SALE_N0T_FOUND, ERROR } = require('../utils/constantes');

const Services = {
  getAllProducts: async () => {
    const products = await Model.getAllProducts();
    return { type: null, statusCode: 200, message: products };
  },

  getProductById: async (id) => {
    const product = await Model.getProductById(id);
    if (!product) {
      return { type: ERROR, statusCode: 404, message: PRODUCT_NOT_FOUND };
    }
    return { type: null, statusCode: 200, message: product };
  },

  insertProduct: async (name) => {
    const newProduct = await Model.insertProduct(name);
    return {
      statusCode: 201,
      message: { id: newProduct, name },
    };
  },

  updateProductById: async (id, newName) => {
    const update = await Model.updateProductById(id, newName);
    if (!update) {
      return { type: ERROR, statusCode: 404, message: PRODUCT_NOT_FOUND };
    }
    return {
      type: null,
      statusCode: 200,
      message: { id, name: newName },
    };
  },

  deleteProductById: async (id) => {
    const deleteProduct = await Model.deleteProductById(id);
    if (!deleteProduct) {
      return { type: ERROR, statusCode: 404, message: PRODUCT_NOT_FOUND };
    }
    return { type: null, statusCode: 204, message: null };
  },

  getAllSales: async () => {
    const sales = await Model.getAllSales();
    return { statusCode: 200, message: sales };
  },

  getSaleById: async (id) => {
    const sale = await Model.getSaleById(id);

    if (sale.length === 0) {
      return { type: ERROR, statusCode: 404, message: SALE_N0T_FOUND };
    }
    return { type: null, statusCode: 200, message: sale };
  },

  insertSales: async (arrayBody) => {
    const allProducts = await Model.getAllProducts();
    const verifica = Helpers.verifyProductId(allProducts, arrayBody);

    if (!verifica) {
      return { type: ERROR, statusCode: 404, message: PRODUCT_NOT_FOUND };
    }

    const insertId = await Model.insertDateSales();
    const message = await Helpers.insertedSales(arrayBody, insertId);

    return { type: null, statusCode: 201, message };
  },

  updateSaleById: async (saleId, arrayBody) => {
    const allProducts = await Model.getAllProducts();
    const existProduct = Helpers.verifyProductId(allProducts, arrayBody);
    const sales = await Model.getSaleById(saleId);

    if (!existProduct) {
      return { type: ERROR, statusCode: 404, message: PRODUCT_NOT_FOUND };
    }
    if (sales.length === 0) {
      return { type: ERROR, statusCode: 404, message: SALE_N0T_FOUND };
    }

    const resultSaleId = await Model.updateSaleById(saleId, arrayBody);

    return {
      type: null,
      statusCode: 200,
      message: { saleId: resultSaleId, itemsUpdated: arrayBody },
    };
  },

  deleteSaleById: async (id) => {
    const deleteSale = await Model.deleteSaleById(id);
    if (deleteSale === 0) {
      return { type: ERROR, statusCode: 404, message: SALE_N0T_FOUND };
    }
    return { type: null, statusCode: 204, message: null };
  },

  searchByQuery: async (query) => {
    const products = await Model.searchByQuery(query);
    return { statusCode: 200, message: products };
  },
};

module.exports = Services;
