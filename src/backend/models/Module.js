import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, trim: true },
    intake: { type: String, trim: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);
export default Module;