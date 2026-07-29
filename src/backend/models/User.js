import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    googleId: { type: String, trim: true },
    passwordHash: { type: String, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;