const {
  createOrder,
  updateOrder,
  deleteOrder,
  updateStatus,
} = require("../controllers/OrderDetails");

const router = require("express").Router();

router
  .post("/create", createOrder)
  .put("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .put("/status/:id", updateStatus);
