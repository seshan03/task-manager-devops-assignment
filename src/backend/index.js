import "dotenv/config";
import express from "express";

import cors from "cors";
import healthRoutes from "./routes/healthRoutes.js";
import connectDatabase from "./utils/db.js";

import moduleRoutes from "./routes/moduleRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import seedAdmin from "./jobs/seedAdmin.js";


const app = express();
const PORT = 5000;

const start = async () => {
  try {
    await connectDatabase();
    await seedAdmin();
    app.use(cors());
    app.use(express.json());
    app.use("/api/health", healthRoutes);
    app.use("/api/modules", moduleRoutes);
    app.use("/api/lectures", lectureRoutes);
    app.use("/api/assignments", assignmentRoutes);
    app.use("/api/auth", authRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();