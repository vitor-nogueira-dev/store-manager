const Middlewares = {
  validName: (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: '"name" is required',
      });
    }
    if (name.length < 5) {
      return res.status(422).json({
        message: '"name" length must be at least 5 characters long',
      });
    }
    return next();
  },

  verifyProductIdAndQuantity: (req, res, next) => {
    const products = req.body;
    const errorMessages = products
      .flatMap(({ productId, quantity }) => [
        productId === undefined && { message: '"productId" is required' },
        quantity === undefined && { message: '"quantity" is required' },
      ])
      .filter(Boolean);

    return errorMessages.length > 0
      ? res.status(400).json(errorMessages[0])
      : next();
  },

  verifyQuantity: (req, res, next) => {
    const products = req.body;
    const errorMessages = products.reduce((acc, product) => {
      const { quantity } = product;
      if (quantity < 1) {
        acc.push({ message: '"quantity" must be greater than or equal to 1' });
      }
      return acc;
    }, []);

    if (errorMessages.length > 0) {
      return res.status(422).json(errorMessages[0]);
    }

    return next();
  },
};

module.exports = Middlewares;
