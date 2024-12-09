const Joi = require("joi");
const mongoose = require("mongoose");

const bill_finish_val = ({ data }) => {
  const validation_rules = {
    _id: Joi.string()
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

module.exports = { bill_finish_val };
