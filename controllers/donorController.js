const bcrypt = require("bcryptjs");
const {
  createDonor,
  findDonorByContact,
  findDonorById,
  updateDonor,
  getPasswordHashById,
  updateDonorPassword,
  searchDonors: searchDonorsModel,
} = require("../models/donorModel");

const registerDonor = async (req, res) => {
  try {
    const data = req.body;

    // 1. Validation
    if (
      !data.fullName ||
      !data.email ||
      !data.password ||
      !data.bloodGroup ||
      !data.phone ||
      !data.city ||
      !data.area
    ) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existing = await findDonorByContact(data.email || data.phone);

    if (existing && existing.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

     // 3. Prepare donor data
    const donorData = {
      fullName: data.fullName,
      email: data.email,
      password: hashedPassword,
      bloodGroup: data.bloodGroup,
      phone: data.phone,
      city: data.city,
      area: data.area,
      available: data.available ? 1 : 0,
    };

    // 4. Insert into DB
    const result = await createDonor(donorData);

    return res.status(201).json({
      success: true,
      message: "Donor registered successfully",
      data: result,
    });

  } catch (err) {
    console.error("Donor register error:", err);
    return res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

// GET /api/donor/me — returns the currently logged-in donor's own row.
// req.user is set by the verifyToken middleware ({ id, role, iat, exp }).
const getMyProfile = async (req, res) => {
  try {
    const donor = await findDonorById(req.user.id);

    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }

    return res.status(200).json({ success: true, donor });
  } catch (err) {
    console.error("Get donor profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      debug: err.message, // TEMP: remove once this is working
    });
  }
};

// PATCH /api/donor/me — updates the currently logged-in donor's own row.
// The frontend panels send { name, phone, email, city, area } or { city, area }
// or { available }, so we map "name" -> "fullName" and normalize "available"
// to 0/1 before handing off to the whitelisted model update.
const updateMyProfile = async (req, res) => {
  try {
    const body = req.body || {};
    const fields = {};

    if (body.name !== undefined) fields.fullName = body.name;
    if (body.fullName !== undefined) fields.fullName = body.fullName;
    if (body.email !== undefined) fields.email = body.email;
    if (body.phone !== undefined) fields.phone = body.phone;
    if (body.city !== undefined) fields.city = body.city;
    if (body.area !== undefined) fields.area = body.area;
    if (body.bloodGroup !== undefined) fields.bloodGroup = body.bloodGroup;
    if (body.available !== undefined) fields.available = body.available ? 1 : 0;

    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ success: false, message: "No valid fields to update" });
    }

    const donor = await updateDonor(req.user.id, fields);

    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }

    return res.status(200).json({ success: true, donor });
  } catch (err) {
    console.error("Update donor profile error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      debug: err.message, // TEMP: remove once this is working
    });
  }
};

// PATCH /api/donor/me/password — changes the logged-in donor's password.
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
      return res.status(404).json({ success: false, message: "Donor not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, currentHash);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Current password is incorrect" });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await updateDonorPassword(req.user.id, newHash);

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

// GET /api/donor/search?bloodGroup=&city=&area= — used by the Find Donor panel.
// Public-facing: never returns email or password, only what's needed to contact
// a donor. Fully open — no login required, full phone number always included.
const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city, area } = req.query;
    const rows = await searchDonorsModel({ bloodGroup, city, area });

    const donors = rows.map((d) => ({
      id: d.id,
      name: d.fullName,
      bloodGroup: d.bloodGroup,
      phone: d.phone,
      city: d.city,
      area: d.area,
      available: !!d.available,
    }));

    return res.status(200).json({ success: true, donors });
  } catch (err) {
    console.error("Donor search error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      debug: err.message, // TEMP: remove once this is working
    });
  }
};

module.exports = { registerDonor, getMyProfile, updateMyProfile, changePassword, searchDonors };