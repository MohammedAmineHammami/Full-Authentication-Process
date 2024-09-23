import mongoose from "mongoose";

const githubUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    githubId: {
      type: String,
      required: true,
    },

    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const GithubUser = mongoose.model("GithubUser", githubUserSchema);

export default GithubUser;
