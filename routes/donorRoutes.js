const express = require("express");
const router = express.Router();

const { registerDonor, getMyProfile, updateMyProfile, changePassword, searchDonors } = require("../controllers/donorController");
const { verifyToken, optionalAuth } = require("../middleware/authMiddleware");

// Donor registration stays its own dedicated route/page, as requested.
router.post("/add", registerDonor);

// Search donors (used by the "Find Donor" panel). Open to everyone —
// no login required. optionalAuth still decodes a token if one is sent,
// but never blocks the request when it's missing/invalid.
router.get("/search", optionalAuth, searchDonors);

// Returns the logged-in donor's own row (requires Authorization: Bearer <token>).
router.get("/me", verifyToken, getMyProfile);

// Updates the logged-in donor's own row.
router.patch("/me", verifyToken, updateMyProfile);

// Changes the logged-in donor's password (requires current password).
router.patch("/me/password", verifyToken, changePassword);

// Donor LOGIN was removed from here on purpose — it now goes through
// the single shared /api/auth/login endpoint with role: "donor".

module.exports = router;
