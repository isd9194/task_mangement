const Joi = require("joi");
const mongoose = require("mongoose");

const cart_add_val = ({ data }) => {
  const validation_rules = {
    product_id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid Product Id");
        }
        return value; // If valid, return the value
      }, "ObjectId validation"),
    quantity: Joi.number().required(),
    bill_id: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid Bill Id");
        }
        return value; // If valid, return the value
      }, "ObjectId validation"),
  };
  const schema = Joi.object(validation_rules);
  return schema.validate(data);
};

module.exports = { cart_add_val };
