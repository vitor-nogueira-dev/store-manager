const camelize = require('camelize');
const connection = require('../db/connection');
const { QUERYS } = require('../utils/constantes');

const Models = {
  getAllProducts: async () => {
    const [result] = await connection.execute(QUERYS.getAllProducts);
    return result;
  },

  getProductById: async (id) => {
    const [[result]] = await connection.execute(QUERYS.getProductById, [id]);
    return result;
  },

  insertProduct: async (product) => {
    const [{ insertId }] = await connection.execute(QUERYS.insertProduct, [
      product,
    ]);
    console.log(insertId, 'insertId');
    return insertId;
  },

  updateProductById: async (id, newName) => {
    const [{ affectedRows }] = await connection.execute(
      QUERYS.updateProductById,
      [newName, id],
    );
    return affectedRows;
  },

  deleteProductById: async (id) => {
    const [{ affectedRows }] = await connection.execute(
      QUERYS.deleteProductById,
      [id],
    );
    return affectedRows;
  },

  getAllSales: async () => {
    const [result] = await connection.execute(QUERYS.getAllSales);
    return camelize(result);
  },
  getSaleById: async (id) => {
    const [result] = await connection.execute(QUERYS.getSaleById, [id]);

    return result;
  },

  insertDateSales: async () => {
    const [{ insertId }] = await connection.execute(QUERYS.insertDateSales);
    return insertId;
  },

  insertProductsSales: async (insertIdSale, productId, quantity) => {
    const [{ insertId }] = await connection.execute(
      QUERYS.insertProductsSales,
      [insertIdSale, productId, quantity],
    );
    console.log(insertId);
    return insertId;
  },

  updateSaleById: async (saleId, arrayBody) => {
    console.log(arrayBody, 'models');
    const cases = arrayBody
      && arrayBody
        .map(({ productId, quantity }) => `WHEN ${productId} THEN ${quantity}`)
        .join(' ');

    const [{ affectedRows }] = await connection.execute(
      QUERYS.updateSaleById(cases, saleId),
    );
    return affectedRows;
  },

  deleteSaleById: async (id) => {
    const [{ affectedRows }] = await connection.execute(QUERYS.deleteSaleById, [
      id,
    ]);
    return affectedRows;
  },

  searchByQuery: async (searchTerm) => {
    const [results] = await connection.execute(QUERYS.searchByQuery, [
      `%${searchTerm}%`,
    ]);
    return results;
  },
};

module.exports = Models;
