import User from "../models/User.js";
import { verifyToken } from "../services/tokenService.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const payload = verifyToken(token);
    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    next();
  }  catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};