import mongoose from "mongoose";
import Lecture from "../models/Lecture.js";

export const getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("module", "name code intake")
      .sort({ dateTime: 1 });
    return res.json({ success: true, data: lectures });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to load lectures" });
  }
};

export const createLecture = async (req, res) => {
  const { module, topic, dateTime, notes } = req.body;

  if (!module || !mongoose.Types.ObjectId.isValid(module)) {
    return res.status(400).json({ success: false, message: "Valid module ID is required" });
  }
  if (!topic) {
    return res.status(400).json({ success: false, message: "Lecture topic is required" });
  }
  const parsedDate = new Date(dateTime);
  if (Number.isNaN(parsedDate.getTime())) {
    return res.status(400).json({ success: false, message: "Valid lecture dateTime is required" });
  }

  try {
    const lecture = await Lecture.create({
      module,
      topic,
      dateTime: parsedDate,
      notes,
    });
    return res.status(201).json({ success: true, data: lecture });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to create lecture" });
  }
};