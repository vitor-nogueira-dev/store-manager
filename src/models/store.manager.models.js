// const camelize = require('camelize');
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

module.exports = {
  getAllProducts,
  getProductById,
};
