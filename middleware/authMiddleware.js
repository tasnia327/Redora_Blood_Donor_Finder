const jwt = require("jsonwebtoken");

// Verifies the JWT on protected routes and attaches the decoded
// payload ({ id, role }) to req.user.
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}

// Like verifyToken, but never blocks the request. If a valid Bearer
// token is present, req.user is populated ({ id, role, iat, exp }) so
// the route can personalize the response. If the header is missing,
// malformed, or the token is invalid/expired, req.user is just left
// undefined and the request continues as an anonymous request.
// Usage: router.get("/public-but-personalizable", optionalAuth, handler)
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    // Ignore invalid/expired tokens on optional routes — just proceed
    // as an anonymous request rather than rejecting it.
  }

  next();
}

// Usage: router.get("/admin-only", verifyToken, authorizeRoles("admin"), handler)
// Restricts access to one or more roles. Always use AFTER verifyToken.
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
}

module.exports = { verifyToken, optionalAuth, authorizeRoles };
