const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const obj = {
  name: {
    type: String,
    required: true,
    minlength: 3, // Minimum length of 5 characters
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },

  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    uniquie: true,
  },
};

// Define a schema
const userSchema = new mongoose.Schema(obj);

// Create a model based on the schema
const Product_schema = mongoose.model("product", userSchema);

// Export the model for use in other files
module.exports = Product_schema;
