const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

// Example of how to protect a route by role, now that authMiddleware
// is actually implemented:
//
// router.get("/admin/stats", verifyToken, authorizeRoles("admin"), someController.stats);
// router.get("/me", verifyToken, someController.getProfile);

module.exports = router;
