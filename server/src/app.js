import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Job Board API Running 🚀",
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

export default app;