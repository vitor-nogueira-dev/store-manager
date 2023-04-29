const Service = require('../services/store.manager.services');

const Controllers = {
  getAllProducts: async (_req, res) => {
    const { statusCode, message } = await Service.getAllProducts();
    return res.status(statusCode).json(message);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    const { type, statusCode, message } = await Service.getProductById(+id);
    if (type) {
      return res.status(statusCode).json({ message });
    }

    return res.status(statusCode).json(message);
  },

  insertProductController: async (req, res) => {
    const { name } = req.body;
    const { statusCode, message } = await Service.insertProduct(name);
    return res.status(statusCode).json(message);
  },

  updateProductById: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { type, statusCode, message } = await Service.updateProductById(
      +id,
      name,
    );
    if (type) {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).json(message);
  },

  deleteProductById: async (req, res) => {
    const { id } = req.params;
    const { type, statusCode, message } = await Service.deleteProductById(+id);
    if (type) {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).send();
  },

  getAllSales: async (_req, res) => {
    const { statusCode, message } = await Service.getAllSales();
    return res.status(statusCode).json(message);
  },

  getSaleById: async (req, res) => {
    const { id } = req.params;
    const { type, statusCode, message } = await Service.getSaleById(+id);
    if (type) {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).json(message);
  },

  insertSalesController: async (req, res) => {
    const arrayBody = req.body;

    const { type, statusCode, message } = await Service.insertSales(arrayBody);
    if (type === 'ERROR') {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).json(message);
  },

  updateSaleById: async (req, res) => {
    const { id } = req.params;
    const arrayBody = req.body;
    const {
      type,
      statusCode,
      message,
    } = await Service.updateSaleById(+id, arrayBody);
    if (type) {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).json(message);
  },

  deleteSaleById: async (req, res) => {
    const { id } = req.params;
    const { type, statusCode, message } = await Service.deleteSaleById(+id);
    if (type === 'ERROR') {
      return res.status(statusCode).json({ message });
    }
    return res.status(statusCode).send();
  },

  searchByQuery: async (req, res) => {
    const { q } = req.query;
    const { statusCode, message } = await Service.searchByQuery(q);
    return res.status(statusCode).json(message);
  },
};

module.exports = Controllers;
