const asyncHandler = require("express-async-handler");

const RideOrder = require("../models/RiderOrder");
// const mongoose = require("mongoose");
// const RiderOrder = require("../models/RiderOrder");
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
  const order = await RideOrder.create({
    userId,
    RideType,
    Price,
    DestinationLongitude,
    DestinationLatitude,
    PickupLatitude,
    PickupLongitude,
  });
  if (order) {
    res.status(201).json(order); // Corrected variable name
  } else {
    res.status(400);
    throw new Error("Invalid order data");
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await RideOrder.find({});
  res.json(orders);
});

module.exports = { createOrder, getAllOrders };
