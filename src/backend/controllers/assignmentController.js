import mongoose from "mongoose";
import Assignment from "../models/Assignment.js";

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("module", "name code intake")
      .populate("lecture", "topic dateTime")
      .sort({ deadline: 1 });
    return res.json({ success: true, data: assignments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to load assignments" });
  }
};

export const createAssignment = async (req, res) => {
  const { title, module, lecture, deadline, details } = req.body;

  if (!title) {
    return res.status(400).json({ success: false, message: "Assignment title is required" });
  }
  if (!module || !mongoose.Types.ObjectId.isValid(module)) {
    return res.status(400).json({ success: false, message: "Valid module ID is required" });
  }
  if (lecture && !mongoose.Types.ObjectId.isValid(lecture)) {
    return res.status(400).json({ success: false, message: "Lecture ID must be valid" });
  }
  const parsedDeadline = new Date(deadline);
  if (Number.isNaN(parsedDeadline.getTime())) {
    return res.status(400).json({ success: false, message: "Valid deadline is required" });
  }

  try {
    const assignment = await Assignment.create({
      title,
      module,
      lecture,
      deadline: parsedDeadline,
      details,
    });
    return res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to create assignment" });
  }
};