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
  .get("/pendingOrders", getOrderByTenMins)
  .get("/:id", getOrderById);


module.exports = router;
