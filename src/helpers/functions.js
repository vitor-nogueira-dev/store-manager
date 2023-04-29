const Model = require('../models/store.manager.models');

const Helpers = {
  verifyProductId: (allProducts, arrayBody) =>
    arrayBody.every((item) =>
      allProducts.some((produto) => item.productId === produto.id)),

  insertedSales: async (arrayBody, insertId) => {
    await Promise.all(
      arrayBody.map(({ productId, quantity }) =>
        Model.insertProductsSales(insertId, productId, quantity)),
    );
    return {
      id: insertId,
      itemsSold: arrayBody,
    };
  },
};

module.exports = Helpers;