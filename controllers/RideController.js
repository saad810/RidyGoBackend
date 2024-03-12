const asyncHandler = require("express-async-handler");
const Rider = require("../models/RiderModel");

// @desc    get all riders
// route    GET /riders
// access   private
const getRiders = asyncHandler(async (req, res) => {
  const riders = await Rider.find({});
  if (!riders.length) {
    res.status(404).json({ message: "No rider found" });
    throw new Error("No rider found");
  }
  res.json(riders);
});

// @desc    get rider by id
// route    GET /riders/:id
// access   private
const getRiderById = asyncHandler(async (req, res) => {
  const rider = await Rider.findById(req.params.id);

  if (!rider) {
    res.status(404).json({ message: "Rider not found" });
    throw new Error("Rider not found");
  }
  res.json(rider);
});

const signUp = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    cnic,
    carName,
    carModel,
    carRegNo,
    carType,
    status,
    rating,
  } = req.body;
  // userExists
  const riderExists = await Rider.findOne({ email });
  if (riderExists) {
    res.status(400).json({ error: "Rider already exists" });
  }
  //   const hashedPassword = await bcrypt.hash(password, 12);

  // Hash the password
  // const hashedPassword = await bcrypt.hash(password, 12);
  // Create a new user
  const newRider = await User.create({
    name,
    email,
    password,
    cnic,
    carName,
    carModel,
    carRegNo,
    carType,
    status,
    rating,
  });
  // Generate token
  const access_token = generateToken(newRider._id);
  // Send response
  res.status(201).json({ success: true, access_token, rider: newRider });
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
    const rider = await Rider.findOne({ email });
    if (!rider) {
      res.status(400).json({ error: "Invalid email or password" });
      throw new Error("Invalid email or password");
    }
    const isMatch = password === user.password;
    if (!isMatch) {
      res.status(400).json({ error: "Invalid email or password" });
      throw new Error("Invalid email or password");
    }
    const access_token = generateToken(rider._id);
    res.json({ success: true, access_token, rider });
  } catch (err) {
    console.error("Error signing in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
const updateRiderStatus = asyncHandler(async (req, res) => {
  const rider = await Rider.findById(req.params.id);
  if (rider) {
    rider.status = req.body.status;
    const updatedRider = await rider.save();
    res.json(updatedRider);
  } else {
    res.status(404);
    throw new Error("Rider not found");
  }
});

module.exports = {
    getRiders,
    getRiderById,
    createRider,
    signUp,
    signIn,
    updateRiderStatus,
}
