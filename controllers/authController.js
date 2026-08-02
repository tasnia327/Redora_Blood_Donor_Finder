const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

// Accepts either a simple email address or a phone number (7-15 digits,
// optional leading +). Adjust to taste if you only want one or the other.
function isValidContact(contact) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return emailRegex.test(contact) || phoneRegex.test(contact);
}

// REGISTER
exports.register = async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const contact = req.body.contact?.trim();
    const password = req.body.password;

    if (!username || !contact || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Username must be at least 3 characters long",
      });
    }

    if (!isValidContact(contact)) {
      return res.status(400).json({
        success: false,
        message: "Contact must be a valid email address or phone number",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const [existing] = await db.query(
      "SELECT id FROM users WHERE contact = ?",
      [contact]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await db.query(
      "INSERT INTO users (username, contact, password) VALUES (?, ?, ?)",
      [username, contact, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Register error:", err);

    // If contact has a UNIQUE constraint at the DB level, this catches the
    // rare race condition where two requests pass the SELECT check at once.
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const contact = req.body.contact?.trim();
    const password = req.body.password;
    const requestedRole = req.body.role;

    if (!contact || !password || !requestedRole) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let account;
    let verifiedRole;

    // 🔥 ROLE-BASED TABLE SELECTION
   if (requestedRole === "donor") {
      const [rows] = await db.query(
        "SELECT * FROM donors WHERE email = ? OR phone = ?",
        [contact, contact]
      );
      if (rows.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      account = rows[0];
      verifiedRole = "donor";
    } else {
      const [rows] = await db.query(
        "SELECT * FROM users WHERE contact = ?",
        [contact]
      );
if (rows.length === 0) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      account = rows[0];
      verifiedRole = account.role || "user";
if (requestedRole === "admin" && verifiedRole !== "admin") {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    }

    const isMatch = await bcrypt.compare(password, account.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

     const token = jwt.sign(
      { id: account.id, role: verifiedRole },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: verifiedRole,
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again later",
    });
  }
};
