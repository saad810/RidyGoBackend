const express = require("express");
const router = express.Router();
const { signUp, signIn, getAllUsers, getMostRecentOrdersByUser } = require("../controllers/UserController");
const {verifyToken} = require("../middleware/Token");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/", getAllUsers);
router.get("/recents/:id", getMostRecentOrdersByUser);

module.exports = router;