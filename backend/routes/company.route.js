import express from "express";
import multer from "multer";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router
  .route("/update/:id")
  .put(isAuthenticated, upload.single("logo"), updateCompany);

export default router;
