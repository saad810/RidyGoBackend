const express = require("express");
const router = express.Router();
const { createOrder, getAllOrders } = require("../controllers/OrderController");


router
.post("/create", createOrder)
.get("/", getAllOrders);
module.exports = router;
