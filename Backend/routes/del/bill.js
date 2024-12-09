const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Bill_schema = require("../schema/bill_schema");
const { bill_finish_val } = require("../../validation/bill_validation");
const Cart_schema = require("../schema/cart_schema");
const router = express.Router();

router.post("/create", async (req, res) => {
  const Bill = new Bill_schema();
  const response = await Bill.save();
  res.send(response);
});
router.post("/finish", async (req, res) => {
  const { body } = req;

  const { error } = bill_finish_val({ data: body });
  if (error) {
    res.send(error);
  } else {
    try {
      const { _id } = body;

      const result = await Cart_schema.find({ bill_id: _id });
      let total_amount = 0;

      let product_ids = result.map(({ product_id }) => product_id);

      const condition = { _id: new ObjectId(_id) };
      const value = { $set: { total_amount: 1, final_amount: 1 } };

      const response = await Bill_schema.updateOne(condition, value);
      res.send(product_ids);
    } catch (error) {
      res.send(error);
    }
  }
});

module.exports = router;
