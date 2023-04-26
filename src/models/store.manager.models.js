// const camelize = require('camelize');
const camelize = require('camelize');
const connection = require('../db/connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id',
  );
  // console.log(result, 'result');
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  console.log(result, 'result');
  return result;
};
const insertProduct = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [product],
  );
  console.log(insertId, 'insertId');
  return insertId;
};

const updateProductById = async (id, newName) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [newName, id],
  );
  return affectedRows;
};

const deleteProductById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const getAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT * 
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales ON sales_products.sale_id = sales.id
      ORDER BY sale_id, product_id`,
  );
  return camelize(result);
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    WHERE s.id = ?;`,
    [id],
  );

  return camelize(result);
};

const insertDateSales = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const insertProductsSales = async (insertIdSale, productId, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [insertIdSale, productId, quantity],
  );
  console.log(insertId);
  return insertId;
};

const deleteSaleById = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  insertDateSales,
  insertProductsSales,
  getAllSales,
  getSaleById,
  updateProductById,
  deleteProductById,
  deleteSaleById,
};
