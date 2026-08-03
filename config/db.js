const mysql = require("mysql2");
require("dotenv").config();

// A pool (instead of a single connection) automatically reconnects
// dropped/idle connections and lets multiple queries run concurrently.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verify connectivity once at startup so failures are visible immediately.
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ MySQL Connected");
    connection.release();
  }
});

// .promise() gives us a pool whose .query()/.execute() return Promises,
// so the rest of the app can use async/await instead of callbacks.
module.exports = pool.promise();