const express = require("express");
const cors = require("cors");
require("dotenv").config();


// ✅ ENV VALIDATION
const REQUIRED_ENV_VARS = ["DB_HOST", "DB_USER", "DB_NAME", "JWT_SECRET"];
const missingEnvVars = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.error(
    `❌ Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
  process.exit(1);
}

// ✅ ROUTES
const authRoutes = require("./routes/authRoutes");
const donorRoutes = require("./routes/donorRoutes"); 

const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ ROOT CHECK
app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

// ✅ SINGLE API LAYER
app.use("/api/auth", authRoutes);
app.use("/api/donor", donorRoutes); 

// ❌ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ❌ ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});