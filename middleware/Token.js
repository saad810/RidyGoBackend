const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

 const generateToken = (id) => {
  const access_token = jwt.sign(
    {
      userId: id,
    },
    "access_token",
    {
      expiresIn: "1d",
    }
  );

  return access_token;
};

 const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "access_token", async (err, payload) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: "Session has expired" });
      }
      return res.status(401).json({ error: "Your must be logged in" });
    }
    const { userId } = payload; // Corrected the property name to userId
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      req.user = user; // Attach the user object to the request object for further use
      next(); // Call next middleware
    } catch (error) {
      console.error("Error finding user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = {verifyToken, generateToken};
