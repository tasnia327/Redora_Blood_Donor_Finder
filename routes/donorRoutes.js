const express = require("express");
const router = express.Router();

const { registerDonor } = require("../controllers/donorController");

// Donor registration stays its own dedicated route/page, as requested.
router.post("/add", registerDonor);

// Donor LOGIN was removed from here on purpose — it now goes through
// the single shared /api/auth/login endpoint with role: "donor".

module.exports = router;
