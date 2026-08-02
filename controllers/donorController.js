const bcrypt = require("bcryptjs");
const { createDonor, findDonorByContact } = require("../models/donorModel");

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

module.exports = { registerDonor };