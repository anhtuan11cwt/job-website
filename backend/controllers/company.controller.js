import { Company } from "../models/Company.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Tên công ty là bắt buộc",
        success: false,
      });
    }

    const companyExists = await Company.findOne({ name: companyName });
    if (companyExists) {
      return res.status(400).json({
        message: "Bạn không thể đăng ký công ty trùng lặp",
        success: false,
      });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      company,
      message: "Đăng ký công ty thành công",
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

export const getCompany = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }

    return res.status(200).json({
      companies,
      message: "Lấy danh sách công ty thành công",
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

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      message: "Lấy thông tin công ty thành công",
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

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      returnDocument: "after",
    });

    if (!company) {
      return res.status(404).json({
        message: "Không tìm thấy công ty",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      message: "Cập nhật thông tin thành công",
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
