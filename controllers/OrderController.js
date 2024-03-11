const asyncHandler = require("express-async-handler");

const RideOrder = require("../models/RiderOrder");
const mongoose = require("mongoose");
// @desc    Create a new order
// @route   POST /order/create
// @access  Public

const createOrder = asyncHandler(async (req, res) => {
  const {
    RideType,
    Price,
    DestinationLongitude,
    DestinationLatitude,
    PickupLatitude,
    PickupLongitude,
  } = req.body;
  if (
    // !userId ||
    !RideType ||
    !Price ||
    !DestinationLongitude ||
    !DestinationLatitude ||
    !PickupLongitude ||
    !PickupLatitude
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userId = "65ee6add8b4b2e4a72a534c0";
  const order = new RideOrder({
    userId,
    RideType,
    Price,
    DestinationLongitude,
    DestinationLatitude,
    PickupLatitude,
    PickupLongitude,
  });
  const createdOrder = await order.save();
  if (createdOrder) {
    res.status(201).json(createdOrder);
  } else {
    res.status(400);
    throw new Error("Invalid order data");
  }
  //   res.status(201).json(createdOrder);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await RideOrder.find({});
  res.json(orders);
});

module.exports = { createOrder, getAllOrders };
