const mongoose = require("mongoose");

const obj = {
  // customer_name: {
  //   type: String,
  //   required: true, // Validation: Field is required
  //   minlength: 2, // Minimum length of 5 characters
  // },
  // mobile: Number,
  // email: String,
  // gender: { type: String, enum: ["male", "female", "other"] }, // Predefined values
  // dob: { type: Date },
  total_amount: Number,
  discount: Number,
  final_amount: Number,
  items: { type: Object },
};

// Define a schema
const userSchema = new mongoose.Schema(obj);

// Create a model based on the schema
const Bill_schema = mongoose.model("bill", userSchema);

// Export the model for use in other files
module.exports = Bill_schema;
