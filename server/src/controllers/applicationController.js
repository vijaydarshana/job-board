import prisma from "../config/prisma.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const userId = req.user.id;

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const alreadyApplied = await prisma.application.findFirst({
      where: {
        jobId,
        userId,
      },
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};