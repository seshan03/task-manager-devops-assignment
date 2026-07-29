import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { signToken } from "../services/tokenService.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const buildTokenResponse = (user) => {
  return {
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: signToken({ id: user._id }),
    },
  };
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || user.role !== "admin") {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash || "");

    if (!passwordMatches) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    return res.json(buildTokenResponse(user));
  } catch (error) {
    console.error("loginAdmin error", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ success: false, message: "Google idToken is required" });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return res.status(400).json({ success: false, message: "Invalid Google token" });
    }

    const email = payload.email.toLowerCase();
    const googleId = payload.sub;
    const name = payload.name || payload.email.split("@")[0];

    const user = await User.findOneAndUpdate(
      { email },
      { name, googleId },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json(buildTokenResponse(user));
  } catch (error) {
    console.error("googleLogin error", error);
    return res.status(500).json({ success: false, message: "Google login failed" });
  }
};

export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  return res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};