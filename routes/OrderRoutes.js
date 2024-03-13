const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderById,
  AddReason,
  getOrderByTenMins
} = require("../controllers/OrderController");

router
  .post("/create", createOrder)
  .put("/status/:id", updateStatus)
  .put("/reason/:id", AddReason)
  .get("/", getAllOrders)
  .get("/:id", getOrderById)
  .get("/pendingOrders", getOrderByTenMins);
module.exports = router;
