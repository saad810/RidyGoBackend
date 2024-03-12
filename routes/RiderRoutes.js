const {
  getRiders,
  getRiderById,
  signUp,
  signIn,
  updateRiderStatus,
} = require("../controllers/RideController");
const router = require("express").Router();
const { verifyToken } = require("../middleware/Token");

router.get("/", getRiders);
router.get("/:id", getRiderById);
router.post("/", signUp);
router.post("/login", signIn);
router.post("/status/:id", updateRiderStatus);


module.exports = router;