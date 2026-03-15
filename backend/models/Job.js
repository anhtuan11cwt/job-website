import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    applications: [
      {
        ref: "Application",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    company: {
      ref: "Company",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    created_by: {
      ref: "User",
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    description: {
      required: true,
      type: String,
    },
    experienceLevel: {
      required: true,
      type: String,
    },
    jobType: {
      required: true,
      type: String,
    },
    location: {
      required: true,
      type: String,
    },
    position: {
      required: true,
      type: Number,
    },
    requirements: {
      type: [String],
    },
    salary: {
      required: true,
      type: Number,
    },
    title: {
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
