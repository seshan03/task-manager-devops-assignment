import mongoose from "mongoose";
import Assignment from "../models/Assignment.js";
import Module from '../models/Module.js';
import Lecture from '../models/Lecture.js';

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

// GET /api/assignments/:id
export const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid assignment id' });
  }
  try {
    const assignment = await Assignment.findById(id)
      .populate('module', 'name code intake')
      .populate('lecture', 'topic dateTime');
    if (!assignment) return res.status(404).json({ success: false, message: 'Assignment not found' });
    return res.json({ success: true, data: assignment });
  } catch (err) {
    console.error('getAssignmentById error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/assignments/:id
export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, module: moduleId, lecture: lectureId, deadline, status, details } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid assignment id' });
  }
  if (moduleId && !mongoose.Types.ObjectId.isValid(moduleId)) {
    return res.status(400).json({ success: false, message: 'Invalid module id' });
  }
  if (lectureId && !mongoose.Types.ObjectId.isValid(lectureId)) {
    return res.status(400).json({ success: false, message: 'Invalid lecture id' });
  }

  try {
    if (moduleId) {
      const m = await Module.findById(moduleId);
      if (!m) return res.status(400).json({ success: false, message: 'Module not found' });
    }
    if (lectureId) {
      const l = await Lecture.findById(lectureId);
      if (!l) return res.status(400).json({ success: false, message: 'Lecture not found' });
    }

    const setObj = {
      ...(title !== undefined ? { title } : {}),
      ...(moduleId !== undefined ? { module: moduleId } : {}),
      ...(lectureId !== undefined ? { lecture: lectureId } : {}),
      ...(deadline !== undefined ? { deadline } : {}),
      ...(status !== undefined ? { status } : {}),
      ...(details !== undefined ? { details } : {}),
    };

    const updated = await Assignment.findByIdAndUpdate(
      id,
      { $set: setObj },
      { new: true, runValidators: true }
    )
      .populate('module', 'name code intake')
      .populate('lecture', 'topic dateTime');

    if (!updated) return res.status(404).json({ success: false, message: 'Assignment not found' });
    return res.json({ success: true, data: updated });
  } catch (err) {
    console.error('updateAssignment error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/assignments/:id
export const deleteAssignment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid assignment id' });
  }
  try {
    const removed = await Assignment.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ success: false, message: 'Assignment not found' });
    return res.json({ success: true, data: removed });
  } catch (err) {
    console.error('deleteAssignment error', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};