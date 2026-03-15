import { Application } from "../models/Application.js";
import { Job } from "../models/Job.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Yêu cầu mã công việc",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      applicant: userId,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Bạn đã nộp đơn cho công việc này rồi",
        success: false,
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }

    const newApplication = await Application.create({
      applicant: userId,
      job: jobId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Đã nộp đơn thành công",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
        populate: {
          path: "applicant",
        },
      })
      .sort({ createdAt: -1 });

    if (!job) {
      return res.status(404).json({
        message: "Không tìm thấy công việc",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Yêu cầu trạng thái",
        success: false,
      });
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        message: "Không tìm thấy đơn ứng tuyển",
        success: false,
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Cập nhật trạng thái thành công",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};
