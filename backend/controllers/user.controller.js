import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";
import { getDataUri } from "../utils/dataUri.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Thiếu thông tin",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email này đã được đăng ký",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      fullname,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    return res.status(201).json({
      message: "Tạo tài khoản thành công",
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

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Thiếu thông tin",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không chính xác",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Email hoặc mật khẩu không chính xác",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Tài khoản không tồn tại với vai trò này",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    const userResponse = {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
      role: user.role,
    };

    return res.status(200).json({
      message: `Chào mừng trở lại ${user.fullname}`,
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};

export const logout = async (_req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Đăng xuất thành công",
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

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills?.trim()) {
      user.profile.skills = skills.split(",").map((skill) => skill.trim());
    }

    if (req.files?.profilePhoto) {
      const file = req.files.profilePhoto[0];
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    if (req.files?.resume) {
      const file = req.files.resume[0];
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const userResponse = {
      _id: user._id,
      email: user.email,
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
      role: user.role,
    };

    return res.status(200).json({
      message: "Cập nhật hồ sơ thành công",
      success: true,
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi máy chủ nội bộ",
      success: false,
    });
  }
};
