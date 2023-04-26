const Joi = require('joi');

const schemaName = Joi.string().min(5).required();

module.exports = {
  schemaName,
};
