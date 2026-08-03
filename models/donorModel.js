const db = require("../config/db");

// CREATE
const createDonor = async (data) => {
  const sql = `
    INSERT INTO donors 
    (fullName, email, password, bloodGroup, phone, city, area, available)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [result] = await db.query(sql, [
    data.fullName,
    data.email,
    data.password,
    data.bloodGroup,
    data.phone,
    data.city,
    data.area,
    data.available,
  ]);

  return result;
};

// FIND
const findDonorByContact = async (contact) => {
  const query = `
    SELECT * FROM donors 
    WHERE email = ? OR phone = ?
  `;

  const [rows] = await db.execute(query, [contact, contact]);
  return rows;
};

// FIND BY ID (never select password)
const findDonorById = async (id) => {
  const query = `
    SELECT id, fullName, email, bloodGroup, phone, city, area, available, created_at
    FROM donors
    WHERE id = ?
  `;

  const [rows] = await db.execute(query, [id]);
  return rows[0] || null;
};

// UPDATE (whitelisted columns only — never let password/id be touched here)
const ALLOWED_UPDATE_FIELDS = ["fullName", "email", "bloodGroup", "phone", "city", "area", "available"];

const updateDonor = async (id, fields) => {
  const keys = Object.keys(fields).filter((k) => ALLOWED_UPDATE_FIELDS.includes(k));

  if (keys.length === 0) {
    return null; // nothing valid to update
  }

  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const values = keys.map((k) => fields[k]);

  await db.execute(`UPDATE donors SET ${setClause} WHERE id = ?`, [...values, id]);

  return findDonorById(id);
};

// GET PASSWORD HASH (only ever used internally for verification — never sent to the client)
const getPasswordHashById = async (id) => {
  const [rows] = await db.execute("SELECT password FROM donors WHERE id = ?", [id]);
  return rows[0]?.password || null;
};

// UPDATE PASSWORD (expects an already-hashed password)
const updateDonorPassword = async (id, hashedPassword) => {
  await db.execute("UPDATE donors SET password = ? WHERE id = ?", [hashedPassword, id]);
};

// SEARCH (public-facing results only — never select password)
const searchDonors = async (filters = {}) => {
  const clauses = [];
  const values = [];

  if (filters.bloodGroup) {
    clauses.push("bloodGroup = ?");
    values.push(filters.bloodGroup);
  }
  if (filters.city) {
    clauses.push("city = ?");
    values.push(filters.city);
  }
  if (filters.area) {
    clauses.push("area LIKE ?");
    values.push(`%${filters.area}%`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const [rows] = await db.execute(
    `SELECT id, fullName, bloodGroup, phone, city, area, available
     FROM donors
     ${where}
     ORDER BY available DESC, fullName ASC
     LIMIT 100`,
    values
  );

  return rows;
};

module.exports = {
  createDonor,
  findDonorByContact,
  findDonorById,
  updateDonor,
  getPasswordHashById,
  updateDonorPassword,
  searchDonors,
};