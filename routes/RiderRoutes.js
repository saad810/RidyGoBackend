const {
    getRiders,
    getRiderById,
    signUp,
    signIn,
    updateRiderStatus,
    getRiderByEmail,
  } = require("../controllers/RideController");
  const router = require("express").Router();
  const { verifyToken } = require("../middleware/Token");
  
  router
    .get("/", getRiders)
    .get("/:id", getRiderById)
    .get("/:email", getRiderByEmail)
    .post("/", signUp)
    .post("/login", signIn)
    .post("/status/:id", updateRiderStatus);
  
  module.exports = router;
  