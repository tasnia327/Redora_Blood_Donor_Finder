const express = require("express");
const router = express.Router();

const { getMyProfile, updateMyProfile, changePassword } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

// Returns the logged-in user's own row (requires Authorization: Bearer <token>).
router.get("/me", verifyToken, getMyProfile);

// Updates the logged-in user's own profile fields.
router.patch("/me", verifyToken, updateMyProfile);

// Changes the logged-in user's password (requires current password).
router.patch("/me/password", verifyToken, changePassword);

module.exports = router;
