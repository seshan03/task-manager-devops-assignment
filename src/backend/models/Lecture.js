import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: { type: String, required: true, trim: true },
    dateTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;