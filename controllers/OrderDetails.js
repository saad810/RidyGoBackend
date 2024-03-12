const OrderDetails = require("../models/OrderDetails");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { user, rider, order, status } = req.body;
    const newOrder = await OrderDetails.create({ user, rider, order, status });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, rider, order, status } = req.body;
    const updatedOrder = await OrderDetails.findByIdAndUpdate(
      id,
      { user, rider, order, status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await OrderDetails.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = asyncHandler(async (req, res) => {
  const status = req.body.status;
  const u_id = req.params.id;
  const order = await OrderDetails.findById(u_id);
  if (order) {
    order.status = status;
    const updatedOrder = await OrderDetails.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

module.exports = { createOrder, updateOrder, deleteOrder, updateStatus };
