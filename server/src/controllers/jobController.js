import prisma from "../config/prisma.js";

// ======================
// Create Job
// ======================
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      salary,
      jobType,
      experience,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        description,
        salary,
        jobType,
        experience,
        userId: req.user.id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get All Jobs
// ======================
export const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Get Single Job
// ======================
export const getJob = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("GET JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Update Job
// ======================
export const updateJob = async (req, res) => {
  try {
    const id = Number(req.params.id);

    console.log("========== UPDATE JOB ==========");
    console.log("Job ID:", id);
    console.log("Request Body:", req.body);

    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (existingJob.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      title,
      company,
      location,
      description,
      salary,
      jobType,
      experience,
    } = req.body;

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        title,
        company,
        location,
        description,
        salary,
        jobType,
        experience,
      },
    });

    console.log("Updated Job:", updatedJob);

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// Delete Job
// ======================
export const deleteJob = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (existingJob.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await prisma.job.delete({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};