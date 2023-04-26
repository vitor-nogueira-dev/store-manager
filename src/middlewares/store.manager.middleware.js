const validName = (req, res, next) => {
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
};

const verifyProductIdAndQuantity = (req, res, next) => {
  const products = req.body;
  console.log(products, 'produtos');
  const errorMessages = products
    .map((product) => {
      const { productId, quantity } = product;
      if (!productId) {
        return { message: '"productId" is required' };
      }
      if (quantity === undefined) {
        return { message: '"quantity" is required' };
      }
      return null;
    })
    .filter((message) => message !== null);

  if (errorMessages.length > 0) {
    return res.status(400).json(errorMessages[0]);
  }

  return next();
};
const verifyQuantity = (req, res, next) => {
  const products = req.body;
  const errorMessages = products
    .map((product) => {
      const { quantity } = product;
      if (quantity < 1) {
        return { message: '"quantity" must be greater than or equal to 1' };
      }
      return null;
    })
    .filter((message) => message !== null);

  if (errorMessages.length > 0) {
    return res.status(422).json(errorMessages[0]);
  }

  return next();
};

module.exports = {
  validName,
  verifyProductIdAndQuantity,
  verifyQuantity,
};
