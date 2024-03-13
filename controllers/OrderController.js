const asyncHandler = require("express-async-handler");
const RiderModel = require("../models/RiderModel");
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
const getOrderById = asyncHandler(async (req, res) => {
  const order = await RideOrder.findById(req.params.id);
  // const orders = await RideOrder.findById({});
  res.json(order);
});

const updateStatus = asyncHandler(async (req, res) => {
  const status = req.body.status;
  const orderId = req.params.id;
  const order = await RideOrder.findById(orderId);
  if (order) {
    order.status = status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc    Add reason for order
// @route   POST /order/:id/reason
// @access  Public

const AddReason = asyncHandler(async (req, res) => {
  const { Remarks } = req.body;
  const orderId = req.params.id;

  const order = await RideOrder.findById(orderId);
  if (order) {
    order.Remarks = Remarks;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getOrderByTenMins = async (req, res) => {
  try {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // Calculate 10 minutes ago

    const pendingOrders = await RideOrder.find({
      date: { $gte: tenMinutesAgo }, // Orders within the last 10 minutes
      status: "Pending", // Orders with status Pending
    });

    res.status(200).json({ success: true, data: pendingOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateStatus,
  getOrderById,
  AddReason,
  getOrderByTenMins,
};
