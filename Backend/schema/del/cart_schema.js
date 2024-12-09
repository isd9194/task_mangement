const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const obj = {
  product_id: {
    type: Schema.Types.ObjectId,
    required: true, // Validation: Field is required
  },
  quantity: {
    type: Number,
    required: true,
  },
  bill_id: {
    type: String,
    required: true,
  },
};

// Define a schema
const userSchema = new mongoose.Schema(obj);

// Create a model based on the schema
const Cart_schema = mongoose.model("cart", userSchema);

// Export the model for use in other files
module.exports = Cart_schema;
