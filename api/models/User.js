import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      maxlength: [45, "username is too long..!"],
      minlength: [2, "username is too short..!"],
      required: true,
      unique: true,
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
    googleId: {
      type: String,
      required: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
            v
          ),
        message: (props) => `${props.v} is not a valid password..!`,
      },
    },
    lastLogin: {
      type: Date, // Date.now will save the date when create the doc
      default: Date.now, // Date.now():this will save the date at schema creation
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: String,
    verificationCodeExpireAt: Date,
    resetToken: String,
    resetTokenExpireAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
