const Model = require('../models');

const verifyProductId = (allProducts, arrayBody) =>
  arrayBody.every((item) =>
    allProducts.some((produto) => item.productId === produto.id));

const insertedSales = async (arrayBody, insertId) => {
  const inserts = await Promise.all(
    arrayBody.map(async (elem) => {
      const { productId, quantity } = elem;
      const insertSale = await Model.insertProductsSales(
        insertId,
        productId,
        quantity,
      );
      console.log(insertSale, 'insertSale');
    }),
  );
  console.log(inserts, 'inserts');
  return {
    id: insertId,
    itemsSold: arrayBody,
  };
};
const updatedSales = async (arrayBody, saleId) => {
  const inserts = await arrayBody.map(async (elem) => {
    const { productId, quantity } = elem;
    const insertSale = await Model.updateSaleById(productId, quantity, saleId);
    return insertSale;
  });
  await Promise.all(inserts);
  return {
    id: inserts,
    itemsSold: arrayBody,
  };
};

module.exports = {
  verifyProductId,
  insertedSales,
  updatedSales,
};
