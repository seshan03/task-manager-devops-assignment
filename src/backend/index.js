import express from "express";
import healthRoutes from "./routes/healthRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/health", healthRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});