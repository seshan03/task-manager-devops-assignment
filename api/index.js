import express from "express";
import cors from "cors";
import connectDatabase from "../src/backend/utils/db.js";
import healthRoutes from "../src/backend/routes/healthRoutes.js";
import moduleRoutes from "../src/backend/routes/moduleRoutes.js";
import lectureRoutes from "../src/backend/routes/lectureRoutes.js";
import assignmentRoutes from "../src/backend/routes/assignmentRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

let connected = false;
app.use(async (req, res, next) => {
  if (!connected) {
    await connectDatabase();
    connected = true;
  }
  next();
});

app.use("/api/health", healthRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/assignments", assignmentRoutes);

export default app;