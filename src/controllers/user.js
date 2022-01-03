const Joi = require("joi");
const User = require("../models/user");
const { default: axios } = require("axios");
const mongoose = require("mongoose");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");

//  Create User
const createPhone = async (req, res) => {
  try {
    const schema = Joi.object({
      phone: Joi.string().required().min(10),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .json({ err: error.details[0].message, status: "failed" });
    const { phone } = req.body;
    let user = await User.findOne({ phone });
    if (user) {
      return res.status(400).json({
        msg: "Phone Number already exist.",
        status: "failed",
      });
    }
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      alphabets: false,
      specialChars: false,
    });
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash("123456", salt);
    const password = hash;
    let userData = {
      phone,
      password,
      username: phone,
      verifiedPhone: false,
      role: "customer",
      "verifySMSToken.token": otp,
      "verifySMSToken.expires": Date.now() + 10 * 60 * 1000, // 10 minutes
    };
    const message = `${otp} is your MEVRON App Verification code. Code expires after 10 minutes`;
    // Send OTP SMS to the user e.g await sendSMS(phone, message);

    newUser = await User.create(userData);

    return res.status(201).json({
      msg: "SMS OTP sent",
      data: { user: newUser },
      status: "successful",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const verifyPhone = async (req, res) => {
  try {
    let { token } = req.body;
    let user = await User.findOne({
      "verifySMSToken.token": token,
      "verifySMSToken.expires": { $gt: Date.now() },
      verifiedPhone: false,
    });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid OTP. Please check the code and try again.",
        status: "failed",
      });
    }
    user.verifiedPhone = true;
    user.verifySMSToken = {};
    user.save();
    return res.status(201).json({
      msg: "SMS OTP Validated successfully",
      data: { user },
      status: "successful",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const addName = async (req, res) => {
  try {
    let { fullname, phone } = req.body;

    let user = await User.findOne({
      phone,
    });
    if (!user) {
      return res.status(400).json({
        msg: "Phone Number does not exist.",
        status: "failed",
      });
    }
    if (user.verifiedPhone == false) {
      return res.status(400).json({
        msg: "Phone Number yet to be verified.",
        status: "failed",
      });
    }
    user.fullName = fullname;
    await user.save();
    return res.status(201).json({
      msg: "Name added successfully",
      data: { user },
      status: "successful",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const addEmail = async (req, res) => {
  try {
    let { email, phone } = req.body;

    let user = await User.findOne({
      phone,
    });
    if (!user) {
      return res.status(400).json({
        msg: "Phone Number does not exist.",
        status: "failed",
      });
    }
    if (user.verifiedPhone == false) {
      return res.status(400).json({
        msg: "Phone Number yet to be verified.",
        status: "failed",
      });
    }
    if (user.fullName == false) {
      return res.status(400).json({
        msg: "Please add your Full Name.",
        status: "failed",
      });
    }
    if (user.email == email) {
      return res.status(400).json({
        msg: "Phone Number already taken. Please use another one.",
        status: "failed",
      });
    }
    user.email = email;
    await user.save();
    return res.status(201).json({
      msg: "E-mail added successfully",
      data: { user },
      status: "successful",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(201).json({
      msg: "Users fetched successfully",
      data: { users },
      status: "successful",
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = {
  createPhone,
  verifyPhone,
  addName,
  addEmail,
  getAllUsers,
};
