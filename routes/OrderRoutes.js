const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderById
} = require("../controllers/OrderController");

router
  .post("/create", createOrder)
  .put("/status/:id", updateStatus)
  .get("/", getAllOrders)
  .get("/:id", getOrderById);
module.exports = router;
