const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/Token");

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
module.exports = { signUp, signIn, getAllUsers };
