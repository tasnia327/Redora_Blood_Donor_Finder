const db = require("../config/db");

// Returns the joined users + user_profiles row for a given user id.
// LEFT JOIN + COALESCE so a user who has never edited their profile yet
// still gets sane defaults (falls back to username) instead of nulls.
const getUserProfile = async (userId) => {
  const [rows] = await db.execute(
    `SELECT
       u.id,
       u.username,
       u.contact,
       u.created_at,
       COALESCE(p.name, u.username) AS name,
       COALESCE(p.email, '')        AS email,
       COALESCE(p.phone, '')        AS phone,
       COALESCE(p.city, '')         AS city,
       COALESCE(p.area, '')         AS area
     FROM users u
     LEFT JOIN user_profiles p ON p.user_id = u.id
     WHERE u.id = ?`,
    [userId]
  );

  return rows[0] || null;
};

// UPDATE (whitelisted columns only, same pattern as donorModel)
const ALLOWED_UPDATE_FIELDS = ["name", "email", "phone", "city", "area"];

const updateUserProfile = async (userId, fields) => {
  const keys = Object.keys(fields).filter((k) => ALLOWED_UPDATE_FIELDS.includes(k));

  if (keys.length === 0) {
    return null; // nothing valid to update
  }

  // Make sure a user_profiles row exists before we UPDATE it — a brand new
  // user has never had one created (registration only touches `users`).
  await db.execute(
    `INSERT INTO user_profiles (user_id) VALUES (?)
     ON DUPLICATE KEY UPDATE user_id = user_id`,
    [userId]
  );

  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const values = keys.map((k) => fields[k]);

  await db.execute(
    `UPDATE user_profiles SET ${setClause} WHERE user_id = ?`,
    [...values, userId]
  );

  return getUserProfile(userId);
};

// GET PASSWORD HASH (only ever used internally for verification — never sent to the client)
const getPasswordHashById = async (userId) => {
  const [rows] = await db.execute("SELECT password FROM users WHERE id = ?", [userId]);
  return rows[0]?.password || null;
};

// UPDATE PASSWORD (expects an already-hashed password)
const updateUserPassword = async (userId, hashedPassword) => {
  await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);
};

module.exports = { getUserProfile, updateUserProfile, getPasswordHashById, updateUserPassword };
