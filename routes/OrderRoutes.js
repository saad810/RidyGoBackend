const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderById,
  AddReason,
} = require("../controllers/OrderController");

router
  .post("/create", createOrder)
  .put("/status/:id", updateStatus)
  .put("/:id/reason", AddReason)
  .get("/", getAllOrders)
  .get("/:id", getOrderById);
module.exports = router;
