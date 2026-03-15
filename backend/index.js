import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import connectDB from "./utils/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/home", (_req, res) => {
  res.status(200).json({
    message: "Tôi đến từ phía máy chủ",
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
