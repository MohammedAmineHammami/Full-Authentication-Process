import mongoose from "mongoose";

const googleUserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
        message: (props) => `${props.v} is not a valid email..!`,
      },
      required: true,
      unique: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

export default GoogleUser;
