import bcrypt from "bcrypt";
import User from "../models/User.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be defined");
}

const seedAdmin = async () => {
  const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (existing) {
    if (existing.role !== "admin" || existing.passwordHash !== passwordHash) {
      existing.role = "admin";
      existing.passwordHash = passwordHash;
      await existing.save();
    }
    return;
  }

  await User.create({
    name: "System Admin",
    email: ADMIN_EMAIL.toLowerCase(),
    role: "admin",
    passwordHash,
  });
};

export default seedAdmin;