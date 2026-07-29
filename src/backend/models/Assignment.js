import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: "Lecture" },
    deadline: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Overdue"],
      default: "Pending",
    },
    details: { type: String, trim: true },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;