import Module from "../models/Module.js";

export const getModules = async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { createdBy: req.user.id };
    const modules = await Module.find(query).sort({ createdAt: -1 });
    return res.json({ success: true, data: modules });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to load modules" });
  }
};

export const createModule = async (req, res) => {
  const { name, code, intake, description } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, message: "Module name is required" });
  }

  try {
    const module = await Module.create({
      name,
      code,
      intake,
      description,
      createdBy: req.user.id,
    });
    return res.status(201).json({ success: true, data: module });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Unable to create module" });
  }
};