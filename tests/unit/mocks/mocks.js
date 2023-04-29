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
  name: "Macbook Pro",
};

const insertedProduct = {
  id: 1,
  name: "Macbook Pro",
};

const updateProduct = {
  id: 1,
  name: "AirPod Pro",
};

const insertSales = { insertIdSale: 5, produtId: 1, quantity: 2 };

const arraySales = [{ productId: 1 }, { quantity: 0 }];
const arraySalesAll = [
  { productId: 1, quantity: 2 },
  { quantity: 0, productId: 2 },
];

const insertedSale = {
  id: 1,
  itemsSold: arraySales,
};

const sales = [
  {
    date: "2022-03-01T00:00:00.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2022-03-01T00:00:00.000Z",
    productId: 2,
    quantity: 1,
  },
];

const saleById = {
  date: "2022-03-01T00:00:00.000Z",
  productId: 1,
  quantity: 2,
};

const saleId = 1;

const arrayBody = [
  { productId: 2, quantity: 3 },
  { productId: 4, quantity: 2 },
];

module.exports = {
  storeManager,
  storeManagerById,
  insertProduct,
  insertedProduct,
  insertSales,
  arraySales,
  insertedSale,
  sales,
  saleById,
  updateProduct,
  arraySalesAll,
  saleId,
  arrayBody,
};
