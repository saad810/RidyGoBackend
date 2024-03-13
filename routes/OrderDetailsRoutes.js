const {
  createOrder,
  updateOrder,
  deleteOrder,
  updateStatus,
  getOrderByTenMins,
} = require("../controllers/OrderDetails");

const router = require("express").Router();

router
  // .get("/pendingOrders", getOrderByTenMins)
  .post("/create", createOrder)
  .put("/:id", updateOrder)
  .delete("/:id", deleteOrder)
  .put("/status/:id", updateStatus);
module.exports = router;
