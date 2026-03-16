import express from "express";
import multer from "multer";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(
    isAuthenticated,
    upload.fields([{ name: "profilePhoto" }, { name: "resume" }]),
    updateProfile,
  );

export default router;
