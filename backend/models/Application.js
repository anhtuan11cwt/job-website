import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicant: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    job: {
      ref: "Job",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      default: "pending",
      enum: ["pending", "accepted", "rejected"],
      type: String,
    },
  },
  { timestamps: true },
);

export const Application = mongoose.model("Application", applicationSchema);
