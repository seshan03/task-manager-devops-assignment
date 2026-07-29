import mongoose from "mongoose";
import Lecture from "../models/Lecture.js";
import Module from '../models/Module.js';

export const getLectures = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { createdBy: req.user.id };
    const lectures = await Lecture.find(query)
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
    const existingModule = await Module.findById(module);
    if (!existingModule) {
      return res.status(400).json({ success: false, message: "Module not found" });
    }
    if (req.user.role !== "admin" && existingModule.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const lecture = await Lecture.create({
      module,
      createdBy: req.user.id,
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


// GET /api/lectures/:id
export const getLectureById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid lecture id' });
  }
  try {
    const lecture = await Lecture.findById(id).populate('module', 'name code intake');
    if (!lecture) return res.status(404).json({ success: false, message: 'Lecture not found' });

    if (req.user.role !== "admin" && lecture.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    return res.json({ success: true, data: lecture });
  } catch (err) {
    console.error('getLectureById error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateLecture = async (req, res) => {
  const { id } = req.params;
  const { module: moduleId, topic, dateTime, status, notes } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid lecture id' });
  }
  if (moduleId && !mongoose.Types.ObjectId.isValid(moduleId)) {
    return res.status(400).json({ success: false, message: 'Invalid module id' });
  }

  try {
    const lecture = await Lecture.findById(id);
    if (!lecture) return res.status(404).json({ success: false, message: 'Lecture not found' });

    if (req.user.role !== "admin" && lecture.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    if (moduleId) {
      const m = await Module.findById(moduleId);
      if (!m) return res.status(400).json({ success: false, message: 'Module not found' });
      if (req.user.role !== "admin" && m.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
    }

    const updated = await Lecture.findByIdAndUpdate(
      id,
      { $set: { module: moduleId, topic, dateTime, status, notes } },
      { new: true, runValidators: true }
    ).populate('module', 'name code intake');

    if (!updated) return res.status(404).json({ success: false, message: 'Lecture not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('updateLecture error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteLecture = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid lecture id' });
  }

  try {
    const lecture = await Lecture.findById(id);
    if (!lecture) return res.status(404).json({ success: false, message: 'Lecture not found' });

    if (req.user.role !== "admin" && lecture.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    const removed = await Lecture.findByIdAndDelete(id);
    return res.json({ success: true, data: removed });
  } catch (err) {
    console.error('deleteLecture error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};