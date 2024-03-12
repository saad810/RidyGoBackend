const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateStatus,
} = require("../controllers/OrderController");

router
  .post("/create", createOrder)
  .post("/status/:id", updateStatus)
  .get("/", getAllOrders);
module.exports = router;
