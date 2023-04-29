const Model = require('../models/store.manager.models');
const Helpers = require('../helpers/functions');
const {
  PRODUCT_NOT_FOUND,
  SALE_N0T_FOUND,
  ERROR,
} = require('../utils/constantes');

const Services = {
  getAllProducts: async () => {
    const products = await Model.getAllProducts();
    return Helpers.newReturn(null, 200, products);
  },

  getProductById: async (id) => {
    const product = await Model.getProductById(id);
    if (!product) {
      return Helpers.newReturn(ERROR, 404, PRODUCT_NOT_FOUND);
    }
    return Helpers.newReturn(null, 200, product);
  },

  insertProduct: async (name) => {
    const newProduct = await Model.insertProduct(name);
    return Helpers.newReturn(null, 201, { id: newProduct, name });
  },

  updateProductById: async (id, newName) => {
    const update = await Model.updateProductById(id, newName);
    if (!update) {
      return Helpers.newReturn(ERROR, 404, PRODUCT_NOT_FOUND);
    }
    return Helpers.newReturn(null, 200, { id, name: newName });
  },

  deleteProductById: async (id) => {
    const deleteProduct = await Model.deleteProductById(id);
    if (!deleteProduct) {
      return Helpers.newReturn(ERROR, 404, PRODUCT_NOT_FOUND);
    }
    return Helpers.newReturn(null, 204, null);
  },

  getAllSales: async () => {
    const sales = await Model.getAllSales();
    return Helpers.newReturn(null, 200, sales);
  },

  getSaleById: async (id) => {
    const sale = await Model.getSaleById(id);

    if (sale.length === 0) {
      return Helpers.newReturn(ERROR, 404, SALE_N0T_FOUND);
    }
    return Helpers.newReturn(null, 200, sale);
  },

  insertSales: async (arrayBody) => {
    const allProducts = await Model.getAllProducts();
    const verifica = Helpers.verifyProductId(allProducts, arrayBody);

    if (!verifica) {
      return Helpers.newReturn(ERROR, 404, PRODUCT_NOT_FOUND);
    }

    const insertId = await Model.insertDateSales();
    const message = await Helpers.insertedSales(arrayBody, insertId);

    return Helpers.newReturn(null, 201, message);
  },

  updateSaleById: async (saleId, arrayBody) => {
    const allProducts = await Model.getAllProducts();
    const existProduct = Helpers.verifyProductId(allProducts, arrayBody);
    const sales = await Model.getSaleById(saleId); 

    if (!existProduct) {
      return Helpers.newReturn(ERROR, 404, PRODUCT_NOT_FOUND);
    }
    if (sales.length === 0) {
      return Helpers.newReturn(ERROR, 404, SALE_N0T_FOUND);
    }

    const resultSaleId = await Model.updateSaleById(saleId, arrayBody);
    
    const message = { saleId: resultSaleId, itemsUpdated: arrayBody };

    return Helpers.newReturn(null, 200, message);
  },

  deleteSaleById: async (id) => {
    const deleteSale = await Model.deleteSaleById(id);
    if (!deleteSale) {
      return Helpers.newReturn(ERROR, 404, SALE_N0T_FOUND);
    }
    return Helpers.newReturn(null, 204, null);
  },

  searchByQuery: async (query) => {
    const products = await Model.searchByQuery(query);
    return Helpers.newReturn(null, 200, products);
  },
};

module.exports = Services;
