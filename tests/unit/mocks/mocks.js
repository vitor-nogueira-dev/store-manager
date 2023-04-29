const storeManager = [
  {
    id: 1,
    name: "Ipad Pro",
  },
  {
    id: 2,
    name: "Iphone 13",
  },
];

const storeManagerById = {
  id: 1,
  name: "Iphone 13 pro",
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
  name: "Macbook Pro",
};

const insertSales = { insertIdSale: 5, produtId: 1, quantity: 2 };

const arraySales = [{ productId: 1 }, { quantity: 0 }];
const arraySalesAll = [
  { productId: 1, quantity: 2 },
  { quantity: 1, productId: 2 },
];

const resultInsertSale = {
  id: { insertId: 1 },
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};
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

const arrayProductAll = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const searchName = [{ id: 1, name: "Martelo de Thor" }];

const updateSale = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};
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
  searchName,
  resultInsertSale,
  arrayProductAll,
  updateSale,
};
