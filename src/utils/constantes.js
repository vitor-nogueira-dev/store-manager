const QUERYS = {
  getAllProducts: 'SELECT * FROM StoreManager.products ORDER BY id;',
  getProductById: 'SELECT * FROM StoreManager.products WHERE id = ?;',
  insertProduct: 'INSERT INTO StoreManager.products (name) VALUES (?)',
  updateProductById: 'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
  deleteProductById: 'DELETE FROM StoreManager.products WHERE id = ?;',
  updateSaleById: (cases, saleId) => `
    UPDATE
      StoreManager.sales_products
    SET 
      quantity = CASE product_id ${cases} ELSE quantity END
    WHERE
      sale_id = ${saleId}
  `,
  getAllSales: `
    SELECT
      *
    FROM
      StoreManager.sales_products
      INNER JOIN StoreManager.sales ON sales_products.sale_id = sales.id
    ORDER BY
      sale_id,
      product_id`,
  getSaleById: `
    SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales s
      INNER JOIN StoreManager.sales_products sp ON s.id = sp.sale_id
    WHERE
      s.id = ?;`,
  insertDateSales: 'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  insertProductsSales: `
    INSERT INTO
      StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES
      (?, ?, ?)`,
  deleteSaleById: 'DELETE FROM StoreManager.sales WHERE id = ?;',
  searchByQuery: 'SELECT * FROM StoreManager.products WHERE name LIKE ?;',
};

module.exports = { QUERYS };
