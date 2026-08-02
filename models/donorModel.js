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

module.exports = { createDonor, findDonorByContact };