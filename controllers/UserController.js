const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/Token");
const RideOrder = require("../models/RiderOrder");

const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "All fields are required" });
    throw new Error("All fields are required");
  }
  // userExists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ error: "User already exists" });
  }
  //   const hashedPassword = await bcrypt.hash(password, 12);

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 12);
  // Create a new user
  const newUser = await User.create({
    name,
    email,
    password,
  });
  // Generate token
  const access_token = generateToken(newUser._id);
  // Send response
  res.status(201).json({ success: true, access_token, user: newUser });
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
});

const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ error: "All fields are required" });
      throw new Error("All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      throw new Error("Invalid email or password");
    }
    const isMatch = password === user.password;
    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password" });
      throw new Error("Invalid email or password");
    }
    const access_token = generateToken(user._id);
    res.json({ success: true, access_token, user });
  } catch (err) {
    console.error("Error signing in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Get most recent orders by user
// @route   GET /recents/:id
// @access  Public
const getMostRecentOrdersByUser = asyncHandler(async (req, res) => {
  const limit = 10;
  const userId = req.params.id;
  try {
    // Query RideOrder collection based on userId and sort by date in descending order
    const orders = await RideOrder.find({ userId })
      .sort({ date: -1 }) // Sort by date in descending order (most recent first)
      .limit(limit)
      .exec();
    if (!orders.length)
      return res.status(404).json({ error: "No orders found" });
    res.status(200).json(orders);
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error);
    throw error;
  }
});
const getUserbyId = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  await user.remove();
  res.json({ message: "User removed " });
});
module.exports = {
  signUp,
  signIn,
  getAllUsers,
  getMostRecentOrdersByUser,
  getUserbyId,
  deleteUser,
};
