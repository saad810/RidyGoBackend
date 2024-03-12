const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getAllUsers,
  getMostRecentOrdersByUser,
  getUserbyId,
  deleteUser,
} = require("../controllers/UserController");
const { verifyToken } = require("../middleware/Token");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/", getAllUsers);
router.get("/recents/:id", getMostRecentOrdersByUser);
router.get("/:id", getUserbyId);
router.delete("/:id", deleteUser);

module.exports = router;
