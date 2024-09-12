import User from "../models/User.js";
import bcrypt from "bcrypt";
import { genTokenAndSetCookie } from "../utils/genToken.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPassRequestEmail,
  sendSuccessResetPassEmail,
} from "../mail/email.js";
import { v4 as uuidv4 } from "uuid";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required..!" });
    }
    const isExist = await User.findOne({ username });
    if (isExist) {
      return res
        .status(409)
        .json({ success: false, message: "user is already exist..!" });
    }
    const verificationCode = Math.floor(Math.random() * 900000 + 100000);
    const verificationCodeExpireAt = Date.now() + 60 * 60 * 1000; //1h
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
      username,
      email,
      password: hash,
      verificationCode,
      verificationCodeExpireAt,
    });
    await user.save();
    genTokenAndSetCookie(res, user._id);
    await sendVerificationEmail(user.email, verificationCode);
    res.status(201).json({
      success: true,
      message: "User is registred with successfully..!",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body;
  try {
    if (!verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Please provide the verification code..!",
      });
    }
    const user = await User.findOne({
      verificationCode,
      verificationCodeExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "verification code is invalid or expired!",
      });
    }
    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpireAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    res
      .status(200)
      .json({ success: true, message: "you are account is veriffied." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!(username && password)) {
      return res
        .status(400)
        .json({ success: false, message: "login information are required!" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found!" });
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res
        .status(400)
        .json({ success: false, message: "invalid credentials..!" });
    }
    user.lastLogin = new Date();
    user.save();
    genTokenAndSetCookie(res, user._id);
    res.status(200).json({
      success: true,
      message: "welcome to your account!",
      user: { ...user._doc, password: undefined },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.messsage });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ success: true, message: "you're logout!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const forgotPass = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "verification email not provided..!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "invalid email..!" });
    }
    const resetToken = uuidv4();
    const resetTokenExpireAt = Date.now() + 3600000; //1h
    (user.resetToken = resetToken),
      (user.resetTokenExpireAt = resetTokenExpireAt);
    await user.save();
    await sendResetPassRequestEmail(resetToken, email);
    res
      .status(200)
      .json({ success: true, message: "forgot password link was send..!" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const resetPass = async (req, res) => {
  const { newPass, confirmPass } = req.body;
  const { resetToken } = req.params;
  try {
    if (!(newPass && confirmPass)) {
      return res
        .status(400)
        .json({ success: false, message: "all fields are required..!" });
    }
    if (!resetToken) {
      return res
        .status(400)
        .json({ success: false, message: "reset link is expire..!" });
    }
    if (newPass !== confirmPass) {
      return res.status(400).json({
        success: false,
        message: "there is no match between to provided passwords..!",
      });
    }
    const user = await User.findOne({
      resetToken,
      resetTokenExpireAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token..!" });
    }
    const salt = bcrypt.genSaltSync(10);
    const newPassHash = bcrypt.hashSync(newPass, salt);
    user.password = newPassHash;
    user.resetToken = undefined;
    user.resetTokenExpireAt = undefined;
    await user.save();
    await sendSuccessResetPassEmail(user.email);
    res.status(200).json({
      success: true,
      message: "your password is successfully updated!",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const checkAuth = async (req, res) => {
  res.send("checkAuth");
};
