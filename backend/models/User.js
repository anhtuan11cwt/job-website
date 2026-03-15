import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    fullname: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    phoneNumber: {
      required: true,
      type: Number,
    },
    profile: {
      bio: {
        type: String,
      },
      company: {
        ref: "Company",
        type: mongoose.Schema.Types.ObjectId,
      },
      profilePhoto: {
        default: "",
        type: String,
      },
      resume: {
        type: String,
      },
      resumeOriginalName: {
        type: String,
      },
      skills: {
        type: [String],
      },
    },
    role: {
      enum: ["student", "recruiter"],
      required: true,
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
