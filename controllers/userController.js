const bcrypt = require("bcryptjs");
const {
  getUserProfile,
  updateUserProfile,
  getPasswordHashById,
  updateUserPassword,
} = require("../models/userModel");

// GET /api/user/me — returns the currently logged-in user's own row
// (req.user is set by the verifyToken middleware: { id, role, iat, exp }).
const getMyProfile = async (req, res) => {
  try {
    const user = await getUserProfile(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Get user profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      debug: err.message, // TEMP: remove once this is working
    });
  }
};

// PATCH /api/user/me — updates the currently logged-in user's own profile.
// The frontend sends { name, email, phone, city, area }.
const updateMyProfile = async (req, res) => {
  try {
    const body = req.body || {};
    const fields = {};

    if (body.name !== undefined) fields.name = body.name;
    if (body.email !== undefined) fields.email = body.email;
    if (body.phone !== undefined) fields.phone = body.phone;
    if (body.city !== undefined) fields.city = body.city;
    if (body.area !== undefined) fields.area = body.area;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ success: false, message: "No valid fields to update" });
    }

    const user = await updateUserProfile(req.user.id, fields);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Update user profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      debug: err.message, // TEMP: remove once this is working
    });
  }
};

// PATCH /api/user/me/password — changes the logged-in user's password.
// Requires the correct current password before allowing a change.
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body || {};

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: "Both current and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "New password must be at least 6 characters long" });
    }

    const currentHash = await getPasswordHashById(req.user.id);

    if (!currentHash) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, currentHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(req.user.id, newHash);

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      debug: err.message, // TEMP: remove once this is working
    });
  }
};

module.exports = { getMyProfile, updateMyProfile, changePassword };
