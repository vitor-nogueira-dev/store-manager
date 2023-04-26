const storeManager = [
  {
    id: 1,
    name: "Fulano de Tal",
  },
  {
    id: 2,
    name: "Ciclano da Silva",
  },
];

const storeManagerById = {
  id: 1,
  name: "Fulano de Tal",
};

const insertProduct = {
  name: 'Macbook Pro',
};

const insertedProduct = {
  id: 1,
  name: 'Macbook Pro',
};

const insertSales = { insertIdSale: 5, produtId: 1, quantity: 2 };

const arraySales = [
  { productId: 1 },
  { quantity: 0 },
];

const insertedSale = {
  id: 1,
  itemsSold: arraySales,
};


module.exports = {
  storeManager,
  storeManagerById,
  insertProduct,
  insertedProduct,
  insertSales,
  arraySales,
  insertedSale,
};
