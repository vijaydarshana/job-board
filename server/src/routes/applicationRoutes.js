import express from "express";
import { applyJob } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:id/apply", protect, applyJob);

export default router;