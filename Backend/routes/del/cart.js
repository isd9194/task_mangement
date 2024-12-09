const express = require("express");
const Cart_schema = require("../schema/cart_schema");
const { cart_add_val } = require("../../validation/cart_validation");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { body } = req;
  const { error } = cart_add_val({ data: body });

  if (error) {
    res.send(error); //joi error
  } else {
    try {
      const Cart = new Cart_schema(body);
      const response = await Cart.save();
      res.send(response);
    } catch (error) {
      res.send(error); // mongoose schema error
    }
  }
});

module.exports = router;
