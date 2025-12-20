import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    console.log("🔍 Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    console.log("✅ Token verified:", decoded);
    req.user = decoded; // {id, email, role}
    next();
  } catch (e) {
    console.error("❌ Token verification failed:", e.message);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

export const adminOnly = (req, res, next) => {
  console.log("🔍 Checking admin role. User:", req.user);
  if (req.user && req.user.role === "admin") {
    console.log("✅ Admin access granted");
    return next();
  }
  console.log("❌ Admin access denied");
  return res.status(403).json({ message: "Admin only" });
};
