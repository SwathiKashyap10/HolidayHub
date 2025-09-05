import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Owner from "../models/owner.js";

export const userProtect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.json({ success: false, message: "Not authorized, Please login" });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user from DB (without password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.json({ success: false, message: "User not found" });
    }

    next(); // move to next middleware
  } catch (err) {
    return res.json({ success: false, message: "Not authorized, token failed" });
  }
};

export const ownerProtect = async (req, res, next) => {
  let token;

  // Check if authorization header exists and starts with "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.json({ success: false, message: "Not authorized, no token" });
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get owner from DB (without password)
    req.owner = await Owner.findById(decoded.id).select("-password");

    if (!req.owner) {
      return res.json({ success: false, message: "Owner not found" });
    }

    next(); // move to next middleware
  } catch (err) {
    return res.json({ success: false, message: "Not authorized, token failed" });
  }
};

